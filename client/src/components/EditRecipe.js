import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EditRecipeStore from '../util/editRecipeStore';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Form,
  Col,
  Row,
  Button,
  InputGroup,
  Glyphicon,
  Table
} from 'react-bootstrap';
import classNames from 'classnames';
import './css/EditRecipe.css';
import Auth from '../util/AuthService';

const EditRecipe = observer(class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.store = new EditRecipeStore(this.props.match.params.id);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMealType = this.handleChangeMealType.bind(this);
  }

  componentDidMount() {
    this.store.update();
  }

  render() {
    return this.store.recipe.UserId === Auth.user.id
      ? this.RenderRecipePage()
      : <div></div>;
  }

  RenderRecipePage(props) {
    return (
      <div className="edit-recipe">
        <h2>Redigera recept</h2>
        <hr />
        <form>

          {/**  Titel **/}

          <FieldGroup
            id="title"
            name="title"
            type="text"
            label="Titel"
            onChange={this.handleChange}
            value={this.store.recipe.title}
            />

          {/**  Tid **/}

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Tidsåtgång</ControlLabel>
            <FormControl componentClass="select"
              placeholder="select"
              onChange={this.handleChange}
              name="timeToComplete"
              defaultValue={this.store.recipe.timeToComplete}>
              <option value={0}>
                { formatTime(this.store.recipe.timeToComplete) }
              </option>
              <option value={15}>0:15</option>
              <option value={30}>0:30</option>
              <option value={45}>0:45</option>
              <option value={60}>1:00</option>
              <option value={90}>1:30</option>
              <option value={120}>2:00</option>
              <option value={240}>4:00</option>
              <option value={480}>8:00</option>
              <option value={1440}>24:00+</option>
            </FormControl>
          </FormGroup>

          {/**  Måltid  **/}

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Måltid</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.store.mealType.id}
              onChange={this.handleChangeMealType}
              name="mealType"
              >
              {this.store.allMealTypes.map(tag => {
                return <option key={tag.id} value={tag.id} id={tag.id}>{tag.tag}</option>;
              })}
            </FormControl>
          </FormGroup>

          {/**  Beskrivning  **/}

          <FieldGroup
            id="tweet"
            name="tweet"
            type="text"
            label="Beskrivning"
            onChange={this.handleChange}
            value={this.store.recipe.tweet}
            />

          {/**  Taggar  **/}

          <FormGroup>
            <div className="btn-toolbar">
              <ControlLabel>Taggar</ControlLabel><br />
              {this.store.otherTags.map(tag => {
                return <TagButton 
                        store={this.store} 
                        tag={tag} 
                        id={tag.id} 
                        key={tag.id} 
                        isChecked={true}
                        />
              })}
              {this.store.nonSelectedTags.map(tag => {
                return <TagButton 
                        store={this.store} 
                        tag={tag} 
                        id={tag.id} 
                        key={tag.id}
                        isChecked={false}
                        />
              })}
            </div>
          </FormGroup>

          {/**  Ingredienser  **/}

          <FormGroup>
            <ControlLabel>Ingredienser</ControlLabel><br />
            <IngredientList store={this.store} />
          </FormGroup>

        </form>
        <pre>{ JSON.stringify(this.store.recipe, null, 2) }</pre>
      </div>
    );
  }

  

  handleChange({ target }) {
    this.store.recipe[target.name] = target.value;
  }

  handleChangeMealType({ target }) {
    this.store.setMealType(target.value);
  }

  handleSubmit() {

  }
})

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

const formatTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  hours = hours < 10 ? '0' + hours : hours;
  mins = mins < 10 ? '0' + mins : mins;
  return `${hours}:${mins}`;
}

const TagButton = observer(class TagButton extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.tag = props.tag;
    this.state = {
      checked: props.isChecked
    };
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return <Button 
            className={this.state.checked ? 'active' : ''}
            onClick={this.onClick}
            id={this.tag.id}
            key={this.tag.id}
            >
             #{this.tag.tag}
           </Button>;
  }

  onClick({ target }) {
    const id = parseInt(target.id);
    if (this.state.checked) {
      this.store.recipe.Tags = this.store.recipe.Tags.filter(tag => {
        return tag.id !== id;
      });
    } else {
      this.store.recipe.Tags.push(this.store.allTags.find(tag => {
        return tag.id === id;
      }));
    }
    this.setState({
      checked: !this.state.checked
    })
  }
});

const IngredientList = observer(class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      error: false,
      errorMessages: []
    };
  }

  render() {
    return (
      <FormGroup>
        <Row>
          <Col md={10}>
            <Table hover>
              <tbody>
                {this.store.recipe.RecipeIngredients.map(ingredient => {
                  return (
                    <tr className="clickable-row" key={ingredient.number}>
                      <td
                       key={ingredient.number}
                       id={ingredient.number}
                       onClick={this.deleteIngredient.bind(this)}
                       >
                        <span className="pull-right">
                          <Glyphicon 
                           glyph="remove" 
                           id={ingredient.number}
                           key={ingredient.number}
                           onClick={this.deleteIngredient.bind(this)}
                           />
                        </span>
                        {' ' + ingredient.Ingredient.name + ' '}
                        <strong>
                          {ingredient.amount + ' ' + ingredient.Unit.name}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
            <FormGroup
                controlId="formBasicText">
                <Col xs={12} md={10}>
                  <Col sm={6} className="small-padding">
                    <FormControl
                      type="text"
                      placeholder="Ingrediens"
                      inputRef={(a) => this.ingredient = a}
                    />
                  </Col>
                  <Col xs={4} sm={2} className="small-padding">
                    <FormControl
                     type="text"
                     placeholder="Mängd"
                     inputRef={(b) => this.amount = b}
                     />
                  </Col>
                  <Col xs={4} sm={2} className="small-padding">
                    <FormControl
                     componentClass="select"
                     defaultValue="l"
                     inputRef={(c) => this.unit = c }
                     onChange={this.handleChangeUnit.bind(this)}
                     name="UnitId"
                     >
                      { this.makeUnits() }
                    </FormControl>
                  </Col>
                  <Col xs={4} sm={2} className="add-btn">
                    <Button 
                     onClick={this.addIngredient.bind(this)} 
                     className="fillWidth btn btn-primary"
                     >
                      <Glyphicon glyph="plus" />
                    </Button>
                  </Col>
                </Col>
              </FormGroup>
          </Row>
      </FormGroup>
    );
  }

  makeUnits() {
    let uns = [];
    this.store.units.forEach(function(un) {
        uns.push( <option
                      key={un.id}
                      value={un.id}>
                    { un.abbreviation }
                  </option>

        );
    });
    return uns;
  }

  handleChangeUnit({target}) {
    console.log(target);
  }

  deleteIngredient({ target }) {
    //const id = parseInt(target.id);
    const number = parseInt(target.id);
    // remove ingredient from recipe
    this.store.recipe.RecipeIngredients =
      this.store.recipe.RecipeIngredients.filter(ingredient => {
        return ingredient.number !== number;
      });
    // adjust ingredient indices
    this.store.recipe.RecipeIngredients.map(ingredient => {
      if (ingredient.number > number) ingredient.number--;
    });
  }

  addIngredient(e) {
    const number = this.state.number;
    const ingredientName  = this.ingredient.value;
    const amount    = this.amount.value;
    const UnitId    = parseInt(this.unit.value);
    
    this.store.recipe.RecipeIngredients.push({
      number: this.store.recipe.RecipeIngredients.length+1,
      amount: amount,
      UnitId: UnitId,
      Ingredient: { 
        name: ingredientName
      },
      Unit: {
        name: this.store.units.find(unit => unit.id === UnitId).name
      }
    });
    
    this.ingredient.value = "";
    this.amount.value = "";
    this.unit.value = "1";
  }
});

export default EditRecipe;