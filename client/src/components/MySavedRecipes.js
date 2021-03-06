import React, { Component } from 'react';
import {  Button,  ListGroup, ListGroupItem, Col,
  FormGroup, ControlLabel, FormControl, Row } from 'react-bootstrap';
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
handleClick(i){ //Redirect to the recipe the user clicks on
  let id = this.state.id;
  window.location = "recipe/" + id[i];
}
async componentDidMount() {
//Get favorites for a user
let tempArray = [];
let favArray = [];
let idArray = [];
let timeArray =[];
await  fetch('/api/user/me/favorite', {
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
//Store properties of the recipe in arrays
  for(var j=0; j<tempArray.length; j++) {
    favArray[j] = tempArray[j].title;
    idArray[j] = tempArray[j].id;
    timeArray[j] = tempArray[j].timeToComplete;
  }
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

 sortByName() { //Sort the recipes alphabetically
   let fav = this.state.Obj;
   let titleArray = [];
   let idArray = [];
   let timeArray =[];
   fav.sort(function(a,b) {
     let textA = a.title.toUpperCase();
     let textB = b.title.toUpperCase();
     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   });
   console.log(fav);
   for(var i=0; i<fav.length; i++) {
     titleArray[i] = fav[i].title;
     idArray[i] = fav[i].id;
     timeArray[i] = fav[i].timeToComplete;
   }
   return this.setState({favourites: titleArray, id: idArray, time: timeArray})
 }

 sortByTime() { //Sort the recipes based on how long time they will take to complete
   let fav = this.state.Obj;
   let titleArray = [];
   let idArray = [];
   let timeArray =[];
   fav.sort(function(a,b){
     return parseInt(a.timeToComplete,10) - parseInt(b.timeToComplete,10);
   });

   for(var i=0; i<fav.length; i++) {
     titleArray[i] = fav[i].title;
     idArray[i] = fav[i].id;
     timeArray[i] = fav[i].timeToComplete;
   }

  this.setState({favourites: titleArray, id: idArray, time: timeArray})
}


async removeFav(index, e) {
  e.stopPropagation();
  let removeItem = this.state.id[index];

   fetch('/api/user/me/favorite', {
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
     .then(res => console.log(res))//Remove recipes from frontend and backend bases on which index they have in the list
     .then(async () => {
      await this.setState({
        time: this.state.time.filter((function (e, i) {
          return i !== index;
        })),
        favourites: this.state.favourites.filter((function (e, i) {
          return i !== index;
        }))
      })
      window.location.reload();
    });

  }

async removeAll() {
//Remove all the recipes from front and backend
for(var k =0; k<this.state.favourites.length; k++) {
  let removeItem = this.state.id[k];
    fetch('/api/user/me/favorite', {
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
  }


getFavourites() { //Render the favorites in listgroups
  var favs = this.state.favourites;
  var time = this.state.time;
  let favItems = [];
  for(var i = 0; i<favs.length; i++) {
    favItems.push(<ListGroupItem key={i} id={i}
      className="l-g-i"
      onClick={this.handleClick.bind(this, i)}
      href="#">{favs[i]}<p>Tidsåtgång: {time[i]} minuter</p>
      <span  class="glyphicon glyphicon glyphicon-remove glyphy" onClick={this.removeFav.bind(this, i)}></span>
      </ListGroupItem>)
  }
  return <div className="well">{favItems}</div>;

}
  render() {
    return (
      <div classNtimeame="MySavedRecipes">
      <h2>Mina sparade recept</h2>
        <Row>
        <div className="rowDiv">
        <FormGroup controlId="titel">
        <Col sm={2}>
        </Col>
          <Col componentClass={ControlLabel} sm={2}>
            Sortera efter:
          </Col>
          <Col sm={4}>
          <FormControl componentClass="select"
              placeholder="select"
              value={this.state.dropDown}
              onChange={this.handleChange.bind(this)}
              name="dropDown"
              defaultValue="timeTo">
}           <option value="timeTo">Tidsåtgång</option>
            <option value="Nam">Namn</option>
          </FormControl>
          </Col>
          <Col sm={4}>
          </Col>
        </FormGroup>
        </div>
        </Row>
        <br/>
        <br/>
        <Row>
        <Col sm={3}></Col>
        <Col sm={6} >
        <ListGroup className="l-gg" >

          {this.getFavourites()}
          <Button class="btn btn-danger" onClick={this.removeAll.bind(this)}>Ta bort alla recept</Button>
        </ListGroup>
        </Col>
        <Col sm={2}></Col>
        </Row>
      </div>
    );
  }
}

export default MySavedRecipes;
