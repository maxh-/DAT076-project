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
      favourites: ["recept 1 " , "recept 2 ", "recept 3 ", "recept 4 " , "recept 5 ", "recept 6 "]
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
    .then(res => console.log(res));
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
    var favs = this.state.favourites;
    return (
      <div className="MySavedRecipes">
      <h2>Mina sparade recept</h2>
        <ListGroup>
          {this.getFavourites()}

        </ListGroup>

      </div>
    );
  }
}

export default MySavedRecipes;
