import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col,
  Glyphicon, Button, Modal, Popover, 
  OverlayTrigger, Carousel, Label } from 'react-bootstrap';
import './css/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      upVotes: "1",
      downVotes: "5421",
      time: "",
      description:"Spaghetti carbonara – en älskad favorit med rökt fläsk eller bacon och grädde! Lika bra till släktmiddagen som till fredagsmyset.",
      ingredients: [],
      steps: [],
      show: false,
      tags: []
    }
  }

  componentDidMount() {
    // from the path `/inbox/messages/:id`
    let id = this.props.match.params.id;
    var recipe;
    fetch('/recipe/'+id, {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      console.log(res.recipe.Tags);
      this.setState({
        title: res.recipe.title,
        time: res.recipe.timeToComplete,
        steps: res.recipe.Steps,
        ingredients: res.recipe.RecipeIngredients,
        tags: res.recipe.Tags
      });
    });
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
    this.state.steps.forEach(function(stp) {
      stps.push(
        <Carousel.Item key={stp.number} className="carouselItem">
          <h1>{stp.number}</h1>
          <b>
            {stp.instruction}
          </b>
        </Carousel.Item>
      );
    });
    return stps;
  }
  tags() {
    let tgs = [];
    this.state.tags.forEach(function(tag) { 
      tgs.push(
          <Label className="tag-label" >
            <b># </b>{ tag.tag }
          </Label>
      );
    });
    return tgs;
  }


  render() {
    let ingrs = [];
    this.state.ingredients.forEach(function(ingr) {
      ingrs.push(
          <li key={ingr.number}> 
            <b>{ ingr.Ingredient.name } </b>
            <small> { ingr.amount } { ingr.Unit.name }</small>
          </li>
        );
    });
    let stps = [];
    this.state.steps.forEach(function(stp) {
      stps.push(
          <li key={stp.number} className="itemInList"> 
            <p>
              { stp.instruction } 
            </p>
          </li>
        );
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
            <p>
              { this.tags() }
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
