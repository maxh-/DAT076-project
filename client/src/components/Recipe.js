import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col,
  Glyphicon, Button, Modal, Popover, 
  OverlayTrigger, Carousel } from 'react-bootstrap';
import './css/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Spaghetti Carbonara",
      upVotes: "1",
      downVotes: "5421",
      time: "0:30",
      description:"Spaghetti carbonara – en älskad favorit med rökt fläsk eller bacon och grädde! Lika bra till släktmiddagen som till fredagsmyset.",
      ingredients: [["spaghetti", 300, "g"], ["rökt fläsk", 150, "g"], ["vispgrädde", 0.5, "dl"]],
      steps: ["Koka spaghettin", "Skär fläsket i små tärningar. Stek fläsket knaprigt i smör i en stekpanna","Vispa ihop grädde, salt, vitlök och hälften av osten","Rör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettin", "Rör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettinRör ner fläsk och ostblandningen i den kokta spaghettin"],
      show: false
    }
  }

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    console.log(this.props.match.params.id);
    /*
    fetch('/recipe/')
    */
  }

  cookingMode = (e) => {
    console.log("cooking mode activated!!!");
    this.setState({ show: true });
  }
  closeCookingMode = (e) => {
    this.setState({show:false});
  }
  displayModalSteps = (e) => {
    let stps = [];
    let indexKey = 1;
    this.state.steps.forEach(function(stp) {
      stps.push(
        <Carousel.Item key={indexKey} className="carouselItem">
          <h1>{indexKey}</h1>
          <b>
            {stp}
          </b>
        </Carousel.Item>
      );
      indexKey++;
    });
    return stps;
  }


  render() {
    let c = 0;
    let ingrs = [];
    this.state.ingredients.forEach(function(ingr) {
      ingrs.push(
          <li key={c}> 
            <b>{ ingr[0] }</b>
            <small>{ ingr[1] }{ ingr[2]}</small>
          </li>
        );
      c++;
    });
    let stps = [];
    this.state.steps.forEach(function(stp) {
      stps.push(
          <li key={c} className="itemInList"> 
            <p>
              { stp } 
            </p>
          </li>
        );
      c++;
    });

    return (
      <div id="mainContainer">
        <div>
        <img src="/img/bild.jpg" id="pic" alt="bild"/>
          <Jumbotron>
            <h1> { this.state.title } </h1>
            <p>
              <Glyphicon glyph=" glyphicon glyphicon-thumbs-up "  />
              <small>({ this.state.upVotes })</small>
              <Glyphicon glyph=" glyphicon glyphicon-thumbs-down "  />
              <small>({ this.state.downVotes })</small>
              <Glyphicon glyph=" glyphicon glyphicon glyphicon-time " id="glyph-space" />
              <small> {this.state.time} timmar </small>


            </p>
            <p>
             { this.state.description }
            </p>
          </Jumbotron>
        </div>
        <hr/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4} id="ingrs"  className="lists">
              <h1> Ingredienser </h1>
              <ul>
                { ingrs }
              </ul>
            </Col>
            <Col xs={12} md={8} id="steps" className="lists">
              <h1> 
                Instruktioner 
                  <Button bsStyle="success" className="pad" 
                      onClick={ this.cookingMode.bind(this) }>
                    Börja laga  
                  </Button>
              </h1>
              <ol>
                { stps }  
              </ol>
            </Col>
          </Row>
        </Grid>
         <Modal id="modal" show={this.state.show} onHide={this.closeCookingMode.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalBody">
            <Carousel interval={null}>
              { this.displayModalSteps() }
            </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCookingMode.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Recipe;
