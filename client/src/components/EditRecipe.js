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
  Button
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

  async componentDidMount() {
    await this.store.update();
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
        <form action={this.handleSubmit}>

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
              value={0}
              onChange={this.handleChange}
              name="timeToComplete"
              defaultValue={this.store.recipe.timeToComplete}>
              <option value={0}>{ formatTime(this.store.recipe.timeToComplete) }</option>
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
                return <option value={tag.id} id={tag.id}>{tag.tag}</option>;
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

          <div class="btn-toolbar">
            <ControlLabel>Taggar</ControlLabel><br />
            {this.store.otherTags.map(tag => {
              return <TagButton store={this.store} tag={tag} id={tag.id} isChecked={true}/>
            })}
            {this.store.nonSelectedTags.map(tag => {
              return <TagButton store={this.store} tag={tag} id={tag.id} isChecked={false}/>
            })}
          </div>


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

const Ingredients = observer(class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      ingredients: this.store.recipe.RecipeIngredients
    };
  }
  render() {
    return (
      <div>
        {this.state.ingredients.map(ingredient => {
          return ingredient.Ingredient.name + ' ';
        })}
      </div>
    );
  }
});

export default EditRecipe;