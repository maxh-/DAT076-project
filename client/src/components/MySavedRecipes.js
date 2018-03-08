import React, { Component } from 'react';
import {  Button,  ListGroup, ListGroupItem, ButtonToolbar, Col,
  DropdownButton, MenuItem, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Auth from '../util/AuthService';
import './css/MySavedRecipes.css';

class MySavedRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourites: [ ],
      id: [],
      time: [],
      sort:[],
      dropDown:"",
      favArray: [],
      timeArray:[],
      idArray: [],
      Obj: []
    }


  }
handleClick(i){
  let id = this.state.id;
  window.location = "recipe/ " + id[i];
}
async componentDidMount() {

let tempArray = [];
let favArray = [];
let idArray = [];
let timeArray =[];
await  fetch('/user/me/favorite', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT '+ Auth.token
    },
    method: 'GET'
  })
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => res.favorites.forEach((value) => {
      tempArray.push(value)
    }));

  for(var j=0; j<tempArray.length; j++) {
    favArray[j] = tempArray[j].title;
    idArray[j] = tempArray[j].id;
    timeArray[j] = tempArray[j].timeToComplete;
  }
//console.log(favArray);
console.log(tempArray);
//console.log(idArray);
//console.log(timeArray);
await this.setState({favourites: favArray, id: idArray, time: timeArray, favArray: favArray, timeArray:timeArray, Obj: tempArray })

this.sortByTime();
}

async handleChange({target}) {
await this.setState({
  [target.name]: target.value
});

if(target.value === "Nam") {
  this.sortByName();


  }
  if(target.value === "timeTo")
  this.sortByTime();
}

 sortByName() {
   let fav = this.state.Obj;
   let titleArray = [];
   let idArray = [];
   let timeArray =[];
   fav.sort(function(a,b) {
     let textA = a.title.toUpperCase();
     let textB = b.title.toUpperCase();
     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   });
   //console.log(fav);
   for(var i=0; i<fav.length; i++) {
     titleArray[i] = fav[i].title;
     idArray[i] = fav[i].id;
     timeArray[i] = fav[i].timeToComplete;
   }
   return this.setState({favourites: titleArray, id: idArray, time: timeArray})
 }

 sortByTime() {
   let fav = this.state.Obj;
   let titleArray = [];
   let idArray = [];
   let timeArray =[];
   fav.sort(function(a,b){
     return parseInt(a.timeToComplete) - parseInt(b.timeToComplete);
   });

   for(var i=0; i<fav.length; i++) {
     titleArray[i] = fav[i].title;
     idArray[i] = fav[i].id;
     timeArray[i] = fav[i].timeToComplete;
   }

  this.setState({favourites: titleArray, id: idArray, time: timeArray})
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

async removeFav(index, e) {
  e.stopPropagation();
  let obj = this.state.Obj;
  let removeItem = obj[index].id;

   console.log(this.state.favourites);
   console.log();

  await fetch('/user/me/favorite', {
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
     .then(res => console.log(res))
     .then(async () => {
      await this.setState({
        favourites: this.state.favourites.filter(function (e, i) {
          return i !== index;
        })
      })
    });

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
  let titleAndId = this.state.Obj;
  console.log(titleAndId);
  var favs = this.state.favourites;
  var time = this.state.time;
  var id = this.state.id;
  let favItems = [];
  let timeItems = [];

  for(var i = 0; i<favs.length; i++) {
    favItems.push(<ListGroupItem key={i}
      onClick={this.handleClick.bind(this, i)}
      href="#">{titleAndId[i].title}<p>Tidsåtgång: {titleAndId[i].timeToComplete} minuter</p>
      <span  class="glyphicon glyphicon glyphicon-remove" onClick={this.removeFav.bind(this, i)}></span>
      </ListGroupItem>)
  }

  return <div>{favItems}</div>;

}

  // render component
  render() {

    var favs = this.state.favourites;
    return (
      <div classNtimeame="MySavedRecipes">
      <h2>Mina sparade recept</h2>
      <Button class="btn btn-danger" onClick={this.fillFavorites.bind(this)}>Fyll databas</Button>
        <FormGroup controlId="formControlsSelect">
        <Col sm={2} componentClass={ControlLabel}>
            Sortera efter
        </Col>
        <Col sm={10}>
            <FormControl componentClass="select"
                placeholder="select"
                value={this.state.dropDown}
                onChange={this.handleChange.bind(this)}
                name="dropDown"
                defaultValue="timeTo">
                <option value="timeTo">Tidsåtgång</option>
                <option value="Nam">Namn</option>
            </FormControl>
          </Col>
        </FormGroup>
        <br/>
        <ListGroup>
          {this.getFavourites()}
          <Button class="btn btn-danger" onClick={this.removeAll.bind(this)}>Ta bort alla recept</Button>
        </ListGroup>

      </div>
    );
  }
}

export default MySavedRecipes;
