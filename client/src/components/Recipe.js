import React, { Component } from 'react';
import { get } from 'axios';
import { Jumbotron, Grid, Row, Col, Glyphicon, Button,
  Modal, Label } from 'react-bootstrap';
import './css/Recipe.css';
import Auth from '../util/AuthService';
import RecipeStore from '../util/recipeStore';
import { observer } from 'mobx-react';
import Disqus from 'disqus-react';

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
      step:[],
      show: false,
      tags: [],
      exists: false,
      id: "",
      liked: false,
      style: ""

    }
    RecipeStore.getOne(this.props.match.params.id);
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    if(Auth.isLoggedIn) {
      await fetch('/user/me/likes', {
        headers: {
          'Authorization': 'JWT '+ Auth.token
        },
        method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
          this.setState({
            liked: (undefined !== res.likes.find(function(rec){
              return rec.id === parseInt(RecipeStore.recipe.id,10)
            }))
          });
      });
    }
    fetch('/recipe/'+id, {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      let btnColor = this.state.liked ? '#C5E1A5' : "white";
      this.setState({
        id: id,
        title: RecipeStore.recipe.title,
        tags: RecipeStore.recipe.Tags,
        step: RecipeStore.recipe.Steps.find(function(instr){return instr.number===1}),
        stepIndex: 1,
        exists: true,
        style: { backgroundColor: btnColor, color: '#2ecc71'  }
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({
        title:"404: Receptet kunde inte hittas",
        description: error
      })
    });
  }

  handleLike() {
    if(Auth.isLoggedIn){
      if(!this.state.liked) {
        console.log("LIK");
        RecipeStore.like(this.state.id,Auth.token);
      }
      else {
        console.log("DIS");
        RecipeStore.disLike(this.state.id,Auth.token);
      }
      let btnColor = !this.state.liked ? '#C5E1A5' : "white";
      this.setState(prevState =>({
        liked: !prevState.liked,
        style: { backgroundColor: btnColor,color: '#2ecc71'}
      }));
    } else {
      window.location = '/login';
    }
  }
  componentDidUpdate() {
  }

  cookingMode(e){
    this.setState({ show: true });
  }
  closeCookingMode(e){
    this.setState({show:false});
  }
  switchItem(e){
    if(e.key === " "){
      const nextIndex = (this.state.stepIndex%RecipeStore.recipe.Steps.length)+1;
      this.setState(prevState => ({
        step: RecipeStore.recipe.Steps.find(function(instr) {
          return instr.number===nextIndex
        }),
        stepIndex: prevState.stepIndex+1
      }));
    }
  }

  showJumbotron() {
    if(this.state.exists) {
      return (
        <div>
          <p>
            {this.likeButton()}
            <Glyphicon glyph=" glyphicon glyphicon glyphicon-time " id="glyph-space" />
            <small> { RecipeStore.recipe.timeToComplete } minuter </small>
          </p>
          <p>
           { RecipeStore.recipe.tweet }
          </p>
        </div>
      );
    }
  }
  likeButton() {
    return(
      <Button
        onClick={this.handleLike.bind(this)}
        id="like-btn"
        style={this.state.style}>
        <small>{ RecipeStore.recipe.Likes }</small>
        <img
          src="/img/oven-like.svg"
          id="ovenmitt-style"/>
      </Button>);
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

  showIngredients() {
    let ingrs = [];
    if(this.state.exists) {
      ingrs.push(
        <h1 key={0}> Ingredienser </h1>
      );
      RecipeStore.recipe.RecipeIngredients.forEach(function(ingr) {
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
  showSteps() {
    let stps = [];
    if(this.state.exists) {
      stps.push(
        <h1 key={0}>
          Instruktioner
          <Button bsStyle="success" className="pad"
              onClick={ this.cookingMode.bind(this) }>
            <b>Börja laga</b>
          </Button>
        </h1>
      );
      RecipeStore.recipe.Steps.forEach(function(stp) {
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

  render() {
    const disqusShortname = 'recepter';
    const disqusConfig = {
        identifier: this.props.match.params.id
    };

    return (
      <div id="mainContainer">
        <div id="title-div">
          <RecipeImage id={this.props.match.params.id} />
          <Jumbotron>
            <h1> { this.state.title } </h1>
            { this.showJumbotron() }
            <div id="show-tags">
              { this.showTags() }
            </div>
          </Jumbotron>
        </div>

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

        <hr />
        <Row>
          <Col lg={12}>
            <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
            </Disqus.CommentCount>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </Col>
        </Row>
        <Modal
            id="modal"
            show={this.state.show}
            onKeyPress={this.switchItem.bind(this)}
            onHide={this.closeCookingMode.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{RecipeStore.recipe.title}</Modal.Title>
            <span> Växla instruktion med <b>mellanslag</b></span>
          </Modal.Header>
          <Modal.Body id="modalBody">
            <div>
              <h1>{this.state.step.number}</h1>
              <hr/>
              <p>
                <b>
                  {this.state.step.instruction}
                </b>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCookingMode.bind(this)}>Stäng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const RecipeImage = observer(class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: "url('/img/food.png')", // default image
        maxHeight: "400px",
        minHeight: "400px",
        backgroundAttachment: "fixed"
      }
    }
  }

  async componentDidMount() {
    // load recipe image & update styles if it exists
    const image = `/img/${this.props.id}.jpg`;
    const res = await fetch(image);
    if (res.ok) this.setState({
      style: {
        ...this.state.style,
        background: "url(" + image + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }
    })
  }

  render() {
    return <div style={this.state.style}></div>;
  }
});

export default Recipe;
