import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Glyphicon, Button,
  Modal, Carousel, Label } from 'react-bootstrap';
import './css/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      upVotes: "1",
      downVotes: "5421",
      time: "",
      description:"",
      ingredients: [],
      steps: [],
      show: false,
      tags: [],
      exists: false
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
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
        tags: res.recipe.Tags,
        exists: true
      });
    })
    .catch(error => { 
      console.log(error);
      this.setState({
        title:"404: Receptet kunde inte hittas",
        description: error,
        exists: false
      })

    });
  }

  cookingMode(e){
    this.setState({ show: true });
  }
  closeCookingMode(e){
    this.setState({show:false});
  }
  displayModalSteps(e){
    let stps = [];
    this.state.steps.forEach(function(stp) {
      stps.push(
        <Carousel.Item key={stp.number} className="carouselItem">
          <h1>{stp.number}</h1>
          <hr/>
          <b>
            {stp.instruction}
          </b>
        </Carousel.Item>
      );
    });
    return stps;
  }

  showJumbotron() {
    if(this.state.exists) {
      return  (
        <div>
          <p>
            <Glyphicon glyph=" glyphicon glyphicon-thumbs-up "  />
            <small>({ this.state.upVotes })</small>
            <Glyphicon glyph=" glyphicon glyphicon-thumbs-down "  />
            <small>({ this.state.downVotes })</small>
            <Glyphicon glyph=" glyphicon glyphicon glyphicon-time " id="glyph-space" />
            <small> {this.state.time} minuter </small>

          </p>
          <p>
           { this.state.description }
          </p>
        </div>
      );
    }
  }

  showTags() {
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
  showSteps() {
    let stps = [];
    if(this.state.exists) {
      stps.push(  
        <h1> 
          Instruktioner 
          <Button bsStyle="success" className="pad" 
              onClick={ this.cookingMode.bind(this) }>
            Börja laga  
          </Button>
        </h1>
      );
      this.state.steps.forEach(function(stp) {
        stps.push(
          <li key={stp.number} className="itemInList"> 
            <p>
              { stp.instruction } 
            </p>
          </li>
        );    
      });
    }
    return stps;
  }

  showIngredients() {
    let ingrs = [];
    if(this.state.exists) {
      ingrs.push(  
        <h1> Ingredienser </h1>
      );
      this.state.ingredients.forEach(function(ingr) {
        ingrs.push(
          <li key={ingr.number}> 
            <b>{ ingr.Ingredient.name } </b>
            <small> { ingr.amount } { ingr.Unit.name }</small>
          </li>
        );
      });
    }
    return ingrs;
  }


  render() {
    return (
      <div id="mainContainer">
        <div id="title-div">
          <img src="/img/bild.jpg" id="pic" alt="bild"/>
          <Jumbotron>
            <h1> { this.state.title } </h1>
            { this.showJumbotron() }
            <div id="show-tags">
              { this.showTags() }
            </div>
          </Jumbotron>
        </div>;

        <hr/>

        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4} id="ingrs"  className="lists">
              <ul id="ingredients-list">
                { this.showIngredients() }
              </ul>
            </Col>
            <Col xs={12} md={8} id="steps" className="lists">
              <ol id="steps-list">
                { this.showSteps() }
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
