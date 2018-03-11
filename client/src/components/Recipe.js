import React, { Component } from 'react';
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
      style: "",
      saved: false,
      savedStyle: {backgroundColor: "white"}

    }
    RecipeStore.getOne(this.props.match.params.id);
  }

  async componentDidMount() {
    await RecipeStore.getOne(this.props.match.params.id);
    let id = this.props.match.params.id;
    if(Auth.isLoggedIn) {
      await fetch('/api/user/me/likes', {
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
    await fetch('/api/recipe/'+id, {
      method: 'GET',
    })
    .then(res => res.json())
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
      window.location = '/404';
    });
    await fetch('/api/user/'+RecipeStore.recipe.UserId, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => this.setState({
      author: res.user.firstName + " " + res.user.lastName
    }));
  }

  async saveRecipe() {
    if(Auth.isLoggedIn) {
      const meth = !this.state.saved ? 'POST' : 'DELETE';
      await fetch('/api/user/me/favorite', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+Auth.token,
        },
        method: meth,
        body: JSON.stringify({
          recipeId: this.state.id
        })
      })
      .then(res => res.json())
      .then(res => {
        if(res.success) {
          const color = this.state.saved ?
          {backgroundColor: 'white'} : {backgroundColor: '#fab1a0'};
          this.setState(prevState => ({
            savedStyle: color,
            saved: !prevState.saved
          }));
        }
      });
    }
    else {
      window.location = '/login';
    }
  }

  cookingMode(e){
    this.setState({ show: true });
  }
  closeCookingMode(e){
    this.setState({show:false});
  }
  switchItemViaSpace(e){
    if(e.key === " "){
      this.switchItem();
    }
  }
  switchItemViaClick(){
    this.switchItem();
  }
  switchItem(e){
    const nextIndex = (this.state.stepIndex%RecipeStore.recipe.Steps.length)+1;
    this.setState(prevState => ({
      step: RecipeStore.recipe.Steps.find(function(instr) {
        return instr.number===nextIndex
      }),
      stepIndex: prevState.stepIndex+1
    }));
  }


  handleLike() {
    if(Auth.isLoggedIn){
      const meth = this.state.liked ? 'DELETE' : 'POST';
      fetch('/api/recipe/'+this.state.id+'/like', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+Auth.token
          },
          method: meth,
      })
      .then((res) => res.json())
      .then((res) => {
          if(res.success) {
            RecipeStore.getOne(this.state.id);
            let btnColor = !this.state.liked ? '#C5E1A5' : "white";
            this.setState(prevState =>({
              liked: !prevState.liked,
              style: { backgroundColor: btnColor,color: '#2ecc71'}
            }));
          }
      })
      .catch(error => console.log(error));
    } else {
      window.location = '/login';
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
          alt="oven-like"
          src="/img/oven-like.svg"
          id="ovenmitt-style"/>
      </Button>);
  }

  getUser() {
    return RecipeStore.recipe.UserId
  }
  showJumbotron() {
    if(this.state.exists) {
      const link = "/publicprofile/" + RecipeStore.recipe.UserId;
      return (
        <div>
          <p>
            <span>
              {this.likeButton()}
            </span>
            <span>
              <Button id="save-btn"
                onClick={this.saveRecipe.bind(this)}
                style={this.state.savedStyle}>
                <Glyphicon glyph="glyphicon glyphicon-heart " id="glyph-heart" />
                <small>Spara</small>
              </Button>
            </span>
            <span>
              <Glyphicon glyph=" glyphicon glyphicon-time "  />
              <small> { RecipeStore.recipe.timeToComplete } minuter </small>
            </span>
            <span>
              <Glyphicon glyph=" glyphicon glyphicon-user "  />
              <small><a href={link}>{ this.state.author }</a></small>
            </span>
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

  showIngredients(heading) {
    let ingrs = [];
      if(this.state.exists) {
        if(heading) {
          ingrs.push(
            <h1 key={0}> Ingredienser </h1>
          );
        }
      RecipeStore.recipe.RecipeIngredients.forEach(function(ingr) {
        ingrs.push(
          <li key={ingr.number}>
            <Col xs={8}>
              <b className="ingredient">{ ingr.Ingredient.name } </b>
            </Col>
            <Col xs={4}>
              <small className="amount-and-unit"> { ingr.amount } { ingr.Unit.name }</small>
            </Col>
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
                { this.showIngredients(true) }
              </ul>
            </Col>
            <Col xs={12} md={8} id="steps" className="lists">
              <ol id="steps-list-modal">
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
            <span> Växla instruktion med <b>mellanslag</b> eller <b>klick</b></span>
          </Modal.Header>
          <Modal.Body id="modalBody"
              onClick={this.switchItemViaClick.bind(this)}>
            <div>
            <Row>
              <h1>{this.state.step.number}</h1>
              <hr/>
              </Row>
              <Row>
                <Col sm={12} md={8}>
                  <div className="showIngrs-div-modal" class="well">
                  <p>
                    <b>
                      {this.state.step.instruction}
                    </b>
                  </p>
                </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className="showIngrs-div-modal" class="well">
                    <ul id="ingredients-list-modal" >
                      { this.showIngredients(false) }
                    </ul>
                  </div>
                </Col>
              </Row>
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
    var img = new Image();
    img.onload = () => {
      this.setState({
        style: {
          ...this.state.style,
          background: "url(" + image + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }
      });
    };
    img.src = image;

  }

  render() {
    return <div style={this.state.style}></div>;
  }
});

export default Recipe;
