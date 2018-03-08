import React, { Component } from 'react';
import Auth from '../util/AuthService';
import './css/PublicProfile.css';
import { observer } from 'mobx-react';
import {
  Row, Col, Modal, Button, FormGroup,
  ControlLabel, FormControl, HelpBlock,
  Glyphicon,Table, Grid
} from 'react-bootstrap';
import  {get} from 'axios';

const PublicProfile = observer(class PublicProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes:[],
      id:[]
    };
  }

 async componentDidMount() {
  let recipes = [];
  let tempArray = [];

  await fetch('/user/1/recipes', {
         headers: {
           'Content-Type': 'application/json'
         },
         method: 'GET'
       })
         .then(res => res.json())
         .then(res => res.message.forEach((value) => {
           recipes.push(value)
         }));


            console.log(recipes);
            console.log(recipes.find(function(rec){return rec.id===1}));
            console.log(JSON.stringify(recipes));

            console.log(recipes[1].id);

             this.setState({
                 recipes: recipes, id: tempArray
               });

}

  showRecipes() {
    let tempArray =[];
    let grid = [];
    let recipes =this.state.recipes;


    recipes.forEach(function(recipe) {
      let backGround = {
        backgroundImage: 'url(' + '/img/'+recipe.id+'.jpg' + ')'
      };
      let imgStyle = {
        height:"20px",
        paddingBottom:"5px",
      };
      let spanRightStyle = {
        marginLeft:"20px"
      };
      grid.push(
        <Col className="parent" xs={12} sm={6} lg={4}
            key={recipe.id}>
          <div className="child" style={backGround} >
          </div>
          <div className="op">
            <a href={'/recipe/' + recipe.id } >
              <span>
                { recipe.title }
              </span>
              <span style={spanRightStyle}>
                   { recipe.Likes }
                <img src="/img/oven-like.svg"  style={imgStyle} className="pl"/>
              </span>
            </a>
          </div>
        </Col>
      );
    });
    return grid;
  }

  render() {
    return (

      <div className="PublicProfile">
        <h2>{Auth.user.firstName} {Auth.user.lastName} offentliga profil </h2>
        <Row>
          <Col className="profilePic">
            <img src="/img/sample-profile-pic.jpg" alt=""/>
          </Col>
          <Col>
            <hr />
            <h2>{Auth.user.firstName} recept: </h2>
            <br />
            </Col>

            <Grid className="gr">
             <Row  className="show-grid" >
               <Col  >
                    { this.showRecipes() }
               </Col>
             </Row>
           </Grid>
          
        </Row>
      </div>
    );
  }
});

export default PublicProfile;
