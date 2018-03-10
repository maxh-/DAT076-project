import React, { Component } from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, InputGroup, Glyphicon, ToggleButton,
  ListGroup, ListGroupItem, ToggleButtonGroup, Row, Panel   }  from 'react-bootstrap';
import './css/NewRecipe.css';
import Auth from '../util/AuthService';

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      time: 15,
      steps: [],
      instruction: "",
      stepIndex:1,
      availableTags: [],
      tags: [],
      ingredients: [],
      ingredient: "",
      number:1,
      amount: "",
      unit: "",
      description: "",
      meal: 1,
      units: [],
      showError: false,
      message: ''
    }
    window.submit = this.submitImage;
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.createIngredients = this.createIngredients.bind(this);
    this.createSteps = this.createSteps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //hämta tags, units etc
    fetch('/api/tag/',{
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => this.setState({availableTags: res.tags}));
    fetch('/api/unit/',{
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => this.setState({units: res.recipe}));
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleObjectChange({ target }) {
    var x = this.state.steps.filter(function(obj) {
      return obj['number'] === target.name;
    });
    x={number:parseInt(target.name,10),instruction:target.value};
    let newSteps = [];
    this.state.steps.forEach((element) => {
      if(element.number === x.number) {
        newSteps.push(x);
      }
      else{
        newSteps.push(element);
      }
    });
    this.setState(prevState => ({
      steps: newSteps
    }));
  }

  handleClick(action,key,type) {
    if(action === 'del') {
      if(type === 'ingredient') {
        let filteredIngredients = [];
        let ingredientCounter = 1;
        this.state.ingredients.forEach(function(ingredient) {
          if(ingredient['number'] === key ) {
          }
          else {
            if(ingredient.number === ingredientCounter) {
              filteredIngredients.push(ingredient);
            }else {
              ingredient.number = ingredientCounter;
              filteredIngredients.push(ingredient);
            }
            ingredientCounter++;
          }
        });
        this.setState(prevState => ({
          ingredients: filteredIngredients,
          number: ingredientCounter
        }));
      }
      else if(type === 'number') {
        let filteredItems = [];
        let instructionCounter = 1;
        this.state.steps.forEach(function(instruction) {
          if(instruction['number'] === key ) {
          }
          else {
            if(instruction.number === instructionCounter) {
              filteredItems.push(instruction);
            }else {
              instruction.number = instructionCounter;
              filteredItems.push(instruction);
            }
            instructionCounter++;
          }
        });
        this.setState(prevState => ({
          steps: filteredItems,
          stepIndex: instructionCounter
        }));
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const success = this.validateRecipe();
    if (success) {
      let bod = JSON.stringify({
        title: this.state.title,
        timeToComplete: this.state.time,
        tweet : this.state.description,
        steps: this.state.steps,
        tags: this.state.tags.concat(parseInt(this.state.meal,10)),
        ingredients: this.state.ingredients
      });
      fetch('/api/recipe/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+ Auth.token
        },
        method: 'POST',
        body: bod
      })
        .then(res => res.json())
        .then(async (res) => {
          console.log(res);
          let isSuccess = res.success;
          if (!isSuccess) return false;
          if (!this.state.image) return isSuccess;
          console.log('uploading image...');
          isSuccess = await this.submitImage(this.state.image, res.recipe.id);
          console.log(isSuccess);
          isSuccess = isSuccess.success;
          return isSuccess;
        })
        .then(isSuccess => {
          if(isSuccess === true) {
            alert("Ditt recept är skapat!");
            window.location = '/saved';
          } else {
            alert("Något gick fel.");
          }
        });
      }
  }

  async submitImage(image, id) {
    const data = new FormData();
    await data.append('file', image);
    await data.append('name', id + '.jpg'); // add extension so backend doesn't complain
    console.log('submitting data:', data);
    return fetch('/api/upload', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(body => body)
      .catch(e => e);
}

  async storeImage({ target }) {
    await this.setState({
      image: target.files[0]
    });
    window.image = this.state.image;
    console.log(this.state);
  }

  makeTags() {
    let tgs = [];
    this.state.availableTags.forEach(function(tg) {
      if(tg.id > 4){
        tgs.push( <ToggleButton
                      key={tg.id}
                      value={tg.id}
                      id="tagSpace">
                    <b>#</b>{tg.tag}
                  </ToggleButton>
        );
      }
    });
    return tgs;
  }

  makeUnits() {
    let uns = [];
    this.state.units.forEach(function(un) {
        uns.push( <option
                      key={un.id}
                      value={un.id}>
                    { un.abbreviation }
                  </option>

        );
    });
    return uns;
  }

  addStep(e) {
    if(e.key === 'Enter'){
      let number = this.state.stepIndex;
      let instruction = this.stp.value;
      if(instruction.length > 1) {
        this.setState(prevState => ({
          steps: prevState.steps.concat({instruction, number}),
          stepIndex: prevState.stepIndex+1,
        }));
        this.stp.value = "";
      }
      e.preventDefault();
    }
  }

  addIngredient(e) {
    const number = this.state.number;
    const ingredient  = this.ingredient.value;
    const amount    = this.amount.value;
    const UnitId    = this.unit.value;
    const success = this.validateNewIngredient(ingredient, amount);
    if(success) {
      this.setState(prevState => ({
        ingredients: prevState.ingredients.concat({number, amount, UnitId, ingredient}),
        number: prevState.number+1
      }));
      this.ingredient.value = "";
      this.amount.value = "";
      this.unit.value = "1";
    }
  }

    validateNewIngredient(ingredientName, amount) {
      this.setState({
        showError: false,
        errorMessage: ''
      });

      if (!/[a-zåäö]+/i.test(ingredientName.replace(/ /g, ''))) {
        this.setState({
          showError: true,
          message: 'Ingrediensnamn kan bara bestå av bokstäver och mellanslag.'
        })
        return false;
      }

      if (!/[\d]+/.test(amount)) {
        this.setState({
          showError: true,
          message: 'Mängd kan bara bestå av siffror.'
        })
        return false;
      }
      return true;
    }

    addTags({ target }) {
      if(target.value !== undefined) {
        if(!this.state.tags.includes(parseInt(target.value,10))) {
          this.setState({
            tags: this.state.tags.concat(parseInt(target.value,10))
          });
        }
        else {
          this.setState({
            tags: this.state.tags.filter(word => word !== parseInt(target.value,10))
          });
        }
      }
    }

  createIngredients(ing) {
    let targ  = this.state.units.filter(function(un){
      return parseInt(un.id,10) === parseInt(ing.UnitId,10);
    })
    let un = targ[0].abbreviation;

    return    <ListGroupItem
                  onClick={this.handleClick.bind(this,'del',parseInt(ing['number'],10), 'ingredient')}
                  key={ing['number']}
                  className="ing">
                <Col xs={6}>
                  <b>{ing['ingredient']} </b>
                </Col>
                <Col xs={2}>
                  <small> {ing['amount']}</small>
                </Col>
                <Col xs={2}>
                  <small> { un }</small>
                </Col>
              </ListGroupItem>
  }

  createSteps(stp) {
    return    <li key={stp['number']}>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>{stp['number']}</InputGroup.Addon>
                    <FormControl type="text"
                      value={stp['instruction']}
                      onChange={this.handleObjectChange.bind(this)}
                      name={stp['number']}/>
                    <InputGroup.Button
                      id="input-dropdown-addon"
                      title="Action">
                    <Button onClick={this.handleClick.bind(this, 'del', stp['number'], 'number')}>
                    <Glyphicon glyph="glyphicon glyphicon-remove" />
                    </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </li>
  }

  validateRecipe() {
    this.setState({
      showError: false,
      message: ''
    });

    const title = this.state.title;
    const steps = this.state.steps;
    const tweet = this.state.description;
    const ingredients = this.state.ingredients;

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

  renderError() {
    if (this.state.showError) {
      return (
          <Panel bsStyle="danger">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Fel:</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {this.state.message}
            </Panel.Body>
          </Panel>
        );
    } else {
      return null;
    }
  }

  // render component
  render() {
    var ingrs = this.state.ingredients;
    var ingrsItems = ingrs.map(this.createIngredients);
    var stps = this.state.steps;
    var stpsItems = stps.map(this.createSteps);

    return (
      <div id="mainContainer" onSubmit={this.handleSubmit.bind(this)} >
        <Form horizontal>
          <FormGroup controlId="titel">
            <Col componentClass={ControlLabel} sm={2}>
              Titel
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Titel" name="title"
                  value={this.state.title}
                  onChange={this.handleChange.bind(this)} />
            </Col>
          </FormGroup>

          <FormGroup controlId="fil">
            <Col componentClass={ControlLabel} sm={2}>
              Bild
            </Col>
            <Col sm={10}>
              <FormControl label="File" type="file" onChange={this.storeImage.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col sm={2} componentClass={ControlLabel}>
                Tidsåtgång
            </Col>
            <Col sm={10}>
                <FormControl componentClass="select"
                    placeholder="select"
                    value={this.state.time}
                    onChange={this.handleChange.bind(this)}
                    name="time"
                    defaultValue={15}>
  }               <option value={15}>0:15</option>
                  <option value={30}>0:30</option>
                  <option value={45}>0:45</option>
                  <option value={60}>1:00</option>
                  <option value={90}>1:30</option>
                  <option value={120}>2:00</option>
                  <option value={240}>4:00</option>
                  <option value={480}>8:00</option>
                  <option value={1440}>24:00+</option>
                </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col sm={2} componentClass={ControlLabel}>
                Måltid
            </Col>
            <Col sm={10}>
                <FormControl componentClass="select"
                    placeholder="select"
                    value={this.state.meal}
                    onChange={this.handleChange.bind(this)}
                    name="meal"
                    defaultValue={1}>
                  <option value={1}>Förrätt</option>
                  <option value={2}>Huvudrätt</option>
                  <option value={3}>Efterrätt</option>
                  <option value={4}>Mellanmål</option>
                </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="beskrivning">
            <Col sm={2} componentClass={ControlLabel}>
              Beskrivning
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea"
                  placeholder="Beskrivning"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange.bind(this)}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>
              Taggar
            </Col>
            <Col sm={10}>
              <ToggleButtonGroup name="tags"
                type="checkbox"
                value={this.state.tags}
                onClick={this.addTags.bind(this)} >
                { this.makeTags() }
              </ToggleButtonGroup>
            </Col>
          </FormGroup>

          <FormGroup
            controlId="formBasicText">
            <Col xs={12} componentClass={ControlLabel} sm={2}>
                Ingredienser
            </Col>
            <Col xs={12} sm={10}>
              <Col sm={6} className="noPadding">
                <FormControl
                  type="text"
                  placeholder="Ingrediens"
                  inputRef={(a) => this.ingredient = a}
                />
              </Col>
              <Col xs={4} sm={2} className="noPadding">
                <FormControl
                  type="text"
                  placeholder="Mängd"
                  inputRef={(b) => this.amount = b}
                />
              </Col>
              <Col xs={4} sm={2} className="noPadding">
                <FormControl
                    componentClass="select"
                    defaultValue="l"
                    inputRef={(c) => this.unit = c }
                    onChange={this.handleChange.bind(this)}
                    name="UnitId">
                  { this.makeUnits() }
                </FormControl>
              </Col>
              <Col xs={4} sm={2} className="noPadding">
                <Button onClick={this.addIngredient.bind(this,'in')} className="fillWidth">
                  Lägg till
                </Button>
              </Col>
            </Col>

            <Col sm={2}> </Col>

            <Col sm={10}>
              <ListGroup>
                { ingrsItems }
              </ListGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                Steg
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="textarea"
                placeholder="Enter Step"
                name="instruction"
                inputRef={(a) => this.stp = a}
                onKeyPress={this.addStep.bind(this)}
              />
            </Col>
            <Col sm={2}> </Col>

            <Col sm={10}>
              <ol id="noListStyle"> { stpsItems } </ol>
            </Col>
          </FormGroup>
          <Row>
            <Col sm={2} className="error-row"></Col>
            <Col sm={10} className="error-row">
              {this.renderError()}
            </Col>
          </Row>
          <Col sm={2}></Col>
          <Col id="submitCol" sm={8} xs={10}>
            <ButtonToolbar >
              <Button bsStyle="primary" bsSize="large"  onClick={this.handleSubmit.bind(this)}>
                Publicera
              </Button>
            </ButtonToolbar>
          </Col>
        </Form>
      </div>
    );
  }
}

export default NewRecipe;
