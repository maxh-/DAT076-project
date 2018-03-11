import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EditRecipeStore from '../util/editRecipeStore';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Col,
  Row,
  Button,
  Glyphicon,
  Table,
  Panel
} from 'react-bootstrap';
import './css/EditRecipe.css';
import Auth from '../util/AuthService';

const EditRecipe = observer(class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.store = new EditRecipeStore(this.props.match.params.id);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMealType = this.handleChangeMealType.bind(this);
    this.validateRecipe = this.validateRecipe.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);

    this.state = {
      showError: false,
      message: ''
    }

    if (!Auth.user) window.location = `/recipe/${this.id}`;
  }

  componentDidMount() {
    this.store.update();
  }

  render() {
    return this.store.recipe.UserId === Auth.user.id
      ? this.RenderRecipePage()
      : <div></div>;
  }

  renderError() {
    if (this.state.showError) {
      return (
        <Row>
          <Col md={10}>
            <Panel bsStyle="danger">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Fel:</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {this.state.message}
              </Panel.Body>
            </Panel>  
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }

  RenderRecipePage(props) {
    return (
      <div className="edit-recipe">
        <Col md={10} mdOffset={1}>
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

            {/**  Steg  **/}

            <FormGroup>
              <ControlLabel>Steg</ControlLabel>
              <StepsList store={this.store} />
            </FormGroup>

          </form>

          {this.renderError()}

          <Button className="btn-lg btn-primary" onClick={this.submitRecipe}>Spara ändringar</Button>
        </Col>
      </div>
    );
  }

  handleChange({ target }) {
    this.store.recipe[target.name] = target.value;
  }

  handleChangeMealType({ target }) {
    this.store.setMealType(target.value);
  }

  validateRecipe() {
    this.setState({
      showError: false,
      message: ''
    });

    const title = this.store.recipe.title;
    const steps = this.store.recipe.Steps;
    const tweet = this.store.recipe.tweet;
    const ingredients = this.store.recipe.RecipeIngredients;

    if (title.length === 0 || !/[\w]+/.test(title)) {
      this.setState({
        showError: true,
        message: 'Ogiltig titel. Titeln får inte vara tom.'
      });
      return false;
    }

    if (tweet.length === 0 || !/[\w]+/.test(tweet)) {
      this.setState({
        showError: true,
        message: 'Ogiltig beskrivning. Beskrivningen får inte vara tom.'
      });
      return false;
    }

    if (ingredients.length === 0) {
      this.setState({
        showError: true,
        message: 'Ett recept måste ha minst en ingrediens.'
      });
      return false;
    }

    if (steps.length === 0) {
      this.setState({
        showError: true,
        message: 'Ett recept måste ha minst ett steg.'
      });
      return false;
    }

    return true;
  }

  submitRecipe() {
    const success = this.validateRecipe();
    if (success) {
      const newRecipe = formatRecipe(this.store.recipe);
      console.log(newRecipe);
      fetch(`/api/recipe/${this.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `jwt ${Auth.token}`
        },
        method: 'PUT',
        body: JSON.stringify(newRecipe)
      }).then(res => res.json()).then(body => {
        console.log(body);
        if (body.success) {
          alert('Dina ändringar är sparade!');
        } else {
          alert('Kunde inte spara. Kontrollera att alla fält är korrekt ifyllda.');
        }
      })
    }
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

const formatRecipe = (recipe) => {
  const newRecipe = {};
  newRecipe.title = recipe.title;
  newRecipe.timeToComplete = recipe.timeToComplete;
  newRecipe.tweet = recipe.tweet;
  newRecipe.steps = recipe.Steps.map(step => {
    return {
      instruction: step.instruction,
      number: step.number
    }
  });
  newRecipe.tags = recipe.Tags.map(tag => {
    return tag.id;
  });
  newRecipe.ingredients = recipe.RecipeIngredients.map(ingredient => {
    return {
      number: ingredient.number,
      amount: ingredient.amount,
      UnitId: ingredient.UnitId,
      ingredient: ingredient.Ingredient.name
    }
  })
  return newRecipe;
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
    const id = parseInt(target.id, 10);
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
      showError: false,
      errorMessage: ''
    };
  }

  renderError() {
    if (this.state.showError) {
      return (
        <Row>
          <Col md={10}>
            <Panel bsStyle="danger">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Fel:</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {this.state.errorMessage}
              </Panel.Body>
            </Panel>  
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <FormGroup>
        <Row>
          <Col md={12}>
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
        { this.renderError() }
        <Row>
            <FormGroup
                controlId="formBasicText">
                <Col xs={12} md={12}>
                  <Col sm={6} className="small-padding">
                    <FormControl
                      type="text"
                      placeholder="Ny ingrediens"
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

  deleteIngredient({ target }) {
    const number = parseInt(target.id, 10);
    // remove ingredient from recipe
    this.store.recipe.RecipeIngredients =
      this.store.recipe.RecipeIngredients.filter(ingredient => {
        return ingredient.number !== number;
      });
    // adjust ingredient indices
    this.store.recipe.RecipeIngredients.map(ingredient => {
      if (ingredient.number > number) ingredient.number--;
      return ingredient.number;
    });
  }

  addIngredient(e) {
    const ingredientName  = this.ingredient.value;
    const amount          = this.amount.value;
    const UnitId          = parseInt(this.unit.value, 10);
    
    if (this.validateNewIngredient()) {
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
  }

  validateNewIngredient() {
    const ingredientName = this.ingredient.value;
    const amount         = this.amount.value;

    this.setState({
      showError: false,
      errorMessage: ''
    });

    if (!/[a-zåäö]+/i.test(ingredientName.replace(/ /g, ''))) {
      this.setState({
        showError: true,
        errorMessage: 'Ingrediensnamn kan bara bestå av bokstäver och mellanslag.'
      })
      return false;
    }

    if (!/[\d]+/.test(amount)) {
      this.setState({
        showError: true,
        errorMessage: 'Mängd kan bara bestå av siffror.'
      })
      return false;
    }

    return true;
  }
});

const StepsList = observer(class StepsList extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    
    this.state = {
      newStep: '',
      error: false,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.handleChangeNewStep = this.handleChangeNewStep.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  renderError() {
    if (this.state.error) {
      return (
        <Row>
          <Col md={10}>
            <Panel bsStyle="danger">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Fel:</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {this.state.message}
              </Panel.Body>
            </Panel>  
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <FormGroup>
            {this.store.recipe.Steps.map(step => {
              return (
                <Row className="step">                  
                  <Col md={11}>
                    <FormControl
                      type="text"
                      value={step.instruction}
                      onChange={this.handleChange}
                      id={step.number}
                    />
                  </Col>
                  <Col md={1}>
                    <Button 
                      id={step.number} 
                      onClick={this.deleteStep} 
                      className="btn-block"
                      >
                      <Glyphicon id={step.number} glyph="remove" />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </FormGroup>
          {this.renderError()} 
          <FormGroup>
            <Row className="step">         
              <Col md={11}>
                <FormControl
                  type="text"
                  placeholder="Nytt steg"
                  value={this.state.newStep}
                  onChange={this.handleChangeNewStep}
                />
              </Col>
              <Col md={1}>
                <Button 
                  onClick={this.addStep} 
                  className="btn btn-primary fullWidth btn-block add-btn"
                  >
                  <Glyphicon glyph="plus" />
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  handleChangeNewStep({ target }) {
    this.setState({
      newStep: target.value
    });
  }

  validateStep() {
    this.setState({
      error: false,
      message: ''
    });
    if (/^[\S]+[\S\s]*$/.test(this.state.newStep)) {
      return true;
    } else {
      this.setState({
        error: true,
        message: 'Kontrollera att steget är korret ifyllt.'
      })
      return false;
    }
  }

  deleteStep({ target }) {
    console.log(target.id);
    const id = parseInt(target.id, 10);
    this.store.recipe.Steps =
      this.store.recipe.Steps.filter(step => step.number !== id);
    this.store.recipe.Steps.map(step => {
      if (step.number > id) step.number--;
      return step.number;
    });
  }

  addStep() {
    if (this.validateStep()) {
      this.store.recipe.Steps.push({
        instruction: this.state.newStep,
        number: this.store.recipe.Steps.length+1
      })
      this.setState({
        newStep: ''
      });
    }
  }

  handleChange({ target }) {
    const id = parseInt(target.id, 10);
    this.store.recipe.Steps.find(step => step.number === id).instruction = 
      target.value;
  }
});

export default EditRecipe;