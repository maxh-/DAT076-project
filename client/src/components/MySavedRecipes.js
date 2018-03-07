import React, { Component } from 'react';
import {  Button,  ListGroup, ListGroupItem,   } from 'react-bootstrap';
import Auth from '../util/AuthService';
import './css/MySavedRecipes.css';

class MySavedRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourites: [ ],
      id: [],
      time: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

async componentDidMount() {
let tempArray = [];
let favArray = [];
var idArray = [];
let timeArray =[];
await  fetch('/user/me/favorite', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT '+ Auth.token
    },
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => res.favorites.forEach((value) => {
      tempArray.push(value)
    }));

  for(var j=0; j<tempArray.length; j++) {
    favArray[j] = tempArray[j].title;
    idArray[j] = tempArray[j].id;
    timeArray[j] = tempArray[j].timeToComplete;
  }
console.log(favArray);
console.log(idArray);
console.log(timeArray);
this.setState({favourites: favArray, id: idArray, time: timeArray })
}

handleClick() {

}

async fillFavorites() {
  for(var f=1; f<=8; f++) {
await fetch('/user/me/favorite', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT '+ Auth.token
    },
    method: 'POST',
    body: JSON.stringify({
      recipeId: f
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));
    }
}

async removeFav(index) {
  let removeItem = this.state.id[index];
  await this.setState({
        favourites: this.state.favourites.filter(function (e, i) {
        return i !== index;
      })
    });
   console.log(this.state.favourites);
   console.log();

   fetch('/user/me/favorite', {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'JWT '+ Auth.token
     },
     method: 'DELETE',
     body: JSON.stringify({
       recipeId: removeItem
     })
   })
     .then(res => res.json())
     .then(res => console.log(res));
     //console.log(Auth.token);
  }

  async removeAll() {
for(var k =0; k<this.state.favourites.length; k++) {
  let removeItem = this.state.id[k];
    fetch('/user/me/favorite', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+ Auth.token
      },
      method: 'DELETE',
      body: JSON.stringify({
        recipeId: removeItem
      })
    })
    .then(res => res.json())
    .then(res => console.log(res));
}
    await this.setState ({
      favourites: [], idArray: [], timeArray:[]
    });
  console.log(this.state.favourites.length);
  }


getFavourites() {
  var favs = this.state.favourites;
  var time = this.state.time;
  let favItems = [];
  let timeItems = [];

  for(var i = 0; i<favs.length; i++) {
    favItems.push(<ListGroupItem key={i}
      onClick={this.handleClick.bind(this)}
      href="#">{favs[i]}<p>Tidsåtgång: {time[i]} minuter</p>
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
      <Button class="btn btn-danger" onClick={this.fillFavorites.bind(this)}>Fyll databas</Button>
        <ListGroup>
          {this.getFavourites()}

          <Button class="btn btn-danger" onClick={this.removeAll.bind(this)}>Ta bort alla recept</Button>
        </ListGroup>

      </div>
    );
  }
}

export default MySavedRecipes;
