import React, { Component } from 'react';
import {  Button,  ListGroup, ListGroupItem, Col,
  FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
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
   console.log(fav);
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
     return parseInt(a.timeToComplete,10) - parseInt(b.timeToComplete,10);
   });

   for(var i=0; i<fav.length; i++) {
     titleArray[i] = fav[i].title;
     idArray[i] = fav[i].id;
     timeArray[i] = fav[i].timeToComplete;
   }

  this.setState({favourites: titleArray, id: idArray, time: timeArray})
}
/*async fillFavorites() {
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
*/

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
     .then(res => console.log(res))
     .then(async () => {
      await this.setState({
        time: this.state.time.filter((function (e, i) {
          return i !== index;
        })),
        favourites: this.state.favourites.filter((function (e, i) {
          return i !== index;
        }))
      })
    });
  }

async removeAll() {

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


getFavourites() {
  var favs = this.state.favourites;
  var time = this.state.time;
  let favItems = [];
  for(var i = 0; i<favs.length; i++) {
    favItems.push(<ListGroupItem key={i}
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

        <FormGroup controlId="formControlsSelect">
        <Col className="col-two" sm={2} componentClass={ControlLabel}>
            Sortera efter
        </Col>
        <Col className="col-ten" sm={10}>
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
        <br/>
        <ListGroup class="l-g" >
          {this.getFavourites()}
          <Button class="btn btn-danger" onClick={this.removeAll.bind(this)}>Ta bort alla recept</Button>
        </ListGroup>

      </div>
    );
  }
}

export default MySavedRecipes;
