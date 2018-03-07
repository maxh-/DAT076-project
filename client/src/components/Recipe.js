import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Glyphicon, Button,
  Modal, Carousel, Label } from 'react-bootstrap';
import './css/Recipe.css';
import Auth from '../util/AuthService';
import RecipeStore from '../util/recipeStore';
import { observer } from 'mobx-react';


const Recipe = observer( class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe:[],
      title: "",
      time: "",
      description:"",
      ingredients: [],
      steps: [],
      show: false,
      tags: [],
      exists: false,
      id: ""
    }
    RecipeStore.getOne(this.props.match.params.id);
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    fetch('/recipe/'+id, {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      this.setState({
        id: RecipeStore.recipe.id,
        title: RecipeStore.recipe.title,
        upVotes: RecipeStore.recipe.Likes,
        time: RecipeStore.recipe.timeToComplete,
        steps: RecipeStore.recipe.Steps,
        ingredients: RecipeStore.recipe.RecipeIngredients,
        tags: RecipeStore.recipe.Tags,
        exists: true,
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
  handleLike() {
    RecipeStore.like(this.state.id,Auth.token);
    this.setState({ upVotes: RecipeStore.recipe.Likes });
  }
  componentDidUpdate() {
    //console.log(RecipeStore.recipe.Likes);
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
      let imgStyle = {
        height:"32px",
        paddingBottom:"6px",
        marginLeft:"3px"
      };
      return (
        <div>
          <p>
            <span onClick={this.handleLike.bind(this)}>
              <small>{ RecipeStore.recipe.Likes }</small>
              <img
                  src="/img/oven-like.svg" 
                  style={imgStyle}/>
            </span>
            <Glyphicon glyph=" glyphicon glyphicon glyphicon-time " id="glyph-space" />
            <small> {this.state.time} minuter </small>

          </p>
          <p>
           { RecipeStore.recipe.tweet }
          </p>
        </div>
      );
    }
  }

  showTags() {
    let tgs = [];
    this.state.tags.forEach(function(tag) { 
      tgs.push(
        <Label key={tag.id} className="tag-label" >
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
        <h1 key={0}> 
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
        <h1 key={0}> Ingredienser </h1>
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
});

export default Recipe;
