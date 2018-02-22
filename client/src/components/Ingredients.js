import React, { Component } from 'react';

class Ingredients extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.createIngredients = this.createIngredients.bind(this);
  }
  createIngredients(ing) {
    return    
          <li onClick={this.deleteIngredient(ing['ingr'])} key={ing['ingr']}>
            <b>{ing['ingr']}</b>
            <small>{ing['am']}{ing['un']}</small>
          </li>
  }
  delete(key) {
    this.props.delete(key);
  }
  // render component
  render() {
    var ingrs = this.props.ingredients;
    var ingrsItems = ingrs.map(this.createIngredients);

    return (
      <ul className="ingredients">
          {ingrsItems}
      </ul>
    );
  }
}

export default Ingredients;    