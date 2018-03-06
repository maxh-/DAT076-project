import React, { Component } from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, InputGroup, Glyphicon, ToggleButton,
  ListGroup, ListGroupItem, ToggleButtonGroup,   } from 'react-bootstrap';

import Auth from '../util/AuthService';
import './css/MySavedRecipes.css';

class MySavedRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourites: ["recept1" , "recept2", "recept3" , "recept4", "recept 5"],
      id: ""
    }

    this.handleClick = this.handleClick.bind(this);
  }

componentDidMount() {

  fetch('/user/me/favorite', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT '+ Auth.token
    },
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => console.log(res.favorites));
    //.then(res => this.setState({favourites: res.favorites.title}));
  //Hämta sparade recept

}

handleClick() {

}
async removeFav(index) {
  await  this.setState({
        favourites: this.state.favourites.filter(function (e, i) {
        return i !== index;
      })
    });
   console.log(this.state.favourites);

   /*fetch('/user/me/favorite', {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'JWT '+ Auth.token
     },
     method: 'DELETE',
     body: JSON.stringify({
       recipeId: this.state.id
     })
   })
     .then(res => res.json())
     .then(res => console.log(res));
     */console.log(Auth.token);
  }

  removeAll() {
    this.setState ({
      favourites: []
    });
  }


getFavourites() {
  var favs = this.state.favourites;
  let favItems = [];
  for(var i = 0; i<favs.length; i++) {
    favItems.push(<ListGroupItem key={i}
      onClick={this.handleClick.bind(this)}
      href="#">{favs[i]}
      <span id="kryss" class="glyphicon glyphicon glyphicon-remove" onClick={this.removeFav.bind(this, i)}></span>
      </ListGroupItem>)
        //console.log(this.favourites);
  }
  return <div>{favItems}</div>;

}

  // render component
  render() {
    console.log(Auth.token);
    var favs = this.state.favourites;
    return (
      <div className="MySavedRecipes">
      <h2>Mina sparade recept</h2>
        <ListGroup>
          {this.getFavourites()}

          <Button class="btn btn-danger" onClick={this.removeAll.bind(this)}>Ta bort alla recept</Button>
        </ListGroup>

      </div>
    );
  }
}

export default MySavedRecipes;
