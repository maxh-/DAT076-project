import React, { Component } from 'react';
import './css/PublicProfile.css';
import { observer } from 'mobx-react';
import { Row, Col, Grid } from 'react-bootstrap';

const PublicProfile = observer(class PublicProfile extends Component {

  constructor(props) {

    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      recipes:[],
      user:[],
      firstName:"",
      lastName:"",
    };
  }
//Get tge users public info
async getUser() {
  let usr = [];
  await  fetch('/api/user/' + this.id , {
       headers: {
         'Content-Type': 'application/json'
       },
       method: 'GET'
     })
       .then(res => res.json())
       .then(res => usr.push(res.user));

    await this.setState({user: usr, firstName: usr[0].firstName, lastName: usr[0].lastName, id: usr[0].id  })
}

 async componentDidMount() {
   this.getUser();
   let recipes = [];

//Get recipes made by user
  await fetch('/api/user/'+this.id+'/recipes', {
         headers: {
           'Content-Type': 'application/json'
         },
         method: 'GET'
       })
         .then(res => res.json())
         .then(res => res.message.forEach((value) => {
           recipes.push(value)
         }))
         .catch(error => window.location = '/404');
             this.setState({
                 recipes: recipes, userId: this.props.match.params.id
               });

               await fetch('/api/recipe/1/like', {
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      method: 'GET'
                    })

}
//Render the grid
  showRecipes() {
    let grid = [];
    let recipes =this.state.recipes;
    recipes.forEach(function(recipe) {

      grid.push(
        <Col className="Parent" xs={12} sm={6} lg={4}
            key={recipe.id}>
          <PublicProfileImage id={recipe.id}/>
          <div className="Op">
            <a href={'/recipe/' + recipe.id } >
              <span>
                { recipe.title }
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
        <h2>{this.state.firstName} {this.state.lastName}</h2>
        <Row>
          <Col className="profilePic">
            <img src="/img/sample-profile-pic.jpg" alt=""/>
          </Col>
          <Col>
            <hr />
            <h2> Recept </h2>
            <br />
            </Col>
            <Grid className="Gr">
             <Row  className="Show-grid" >
                    { this.showRecipes()}
             </Row>
           </Grid>
        </Row>
      </div>
    );
  }
});

const PublicProfileImage = observer(class PublicProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: "url('/img/food.png')", // default image
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
    return (
			<div className="Child" style={this.state.style}></div>

		);
  }
});

export default PublicProfile;
