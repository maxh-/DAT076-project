import React, { Component } from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, InputGroup, Glyphicon, ToggleButton,
  ListGroup, ListGroupItem, ToggleButtonGroup,   } from 'react-bootstrap';
import './css/NewRecipe.css';

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      time: "0:15",
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
      units: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createIngredients = this.createIngredients.bind(this);
    this.createSteps = this.createSteps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    //hämta tags, units etc
    fetch('/tag/',{
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => this.setState({availableTags: res.tags}));
    fetch('/unit/',{
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => this.setState({units: res.recipe}));    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.tags);
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
        var filteredItems = this.state.ingredients.filter(function (item) {
          return (item['ingredient'] !== key);
        });
        this.setState(prevState => ({
          ingredients: filteredItems,
          number: prevState.number-1
        }));      
      }
      else if(type==='number') {
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
    console.log("Submit!!");
    console.log(JSON.stringify({
        title: this.state.title,
        timeToComplete: this.state.time,
        steps: this.state.steps,
        tags: this.state.tags.concat(parseInt(this.state.meal)),
        ingredients: this.state.ingredients
      }));
    /*
    fetch('/recipe/create', {
      method: 'POST',
      auth: yes,
      body: JSON.stringify({
        title: this.state.title,
        timeToComplete: this.state.time,
        steps: this.state.steps,
        tags: ******TODO*****
        ingredients: *****TODO******
      })

    });
    */
    e.preventDefault();
  }

  makeTags() {
    let checked = this.state.tags;
    let tgs = [];
    this.state.availableTags.forEach(function(tg) {
      if(tg.id > 4){
        tgs.push( <ToggleButton 
                      key={tg.id} 
                      value={tg.id}>
                    <b>#</b>{tg.tag}
                  </ToggleButton>
        );
      }
    });
    return tgs;
  }
  makeUnits() {
    let checked = this.state.tags;
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

  addStep = (e) => {
    if(e.key === 'Enter'){
      let number = this.state.stepIndex;
      let instruction = this.stp.value;
      if(instruction.length > 1) {
        this.setState(prevState => ({
          steps: prevState.steps.concat({number,instruction}),
          stepIndex: prevState.stepIndex+1,
        }));
        this.stp.value = "";
      }
      e.preventDefault();
    }
  }

  addItem = (e) => {
    let number = this.state.number;
    let ingredient  = this.ingredient.value;
    let amount    = this.amount.value;
    let unit    = this.unit.value;
    this.setState(prevState => ({
      ingredients: prevState.ingredients.concat({number, ingredient, amount, unit}),
      number: prevState.number+1
    }));
    this.ingredient.value = "";
    this.amount.value = "";
    this.unit.value = "";
  }

  addTags({ target }) {
    console.log(target.value);
    if(target.value !== undefined) {
      if(!this.state.tags.includes(target.value)) {
        this.setState({
          tags: this.state.tags.concat(parseInt(target.value))
        });
      }
      else {
        this.setState({
          tags: this.state.tags.filter(word => word !== target.value)
        });
      }
    }
  }

  createIngredients(ing) {
    return    <ListGroupItem onClick={this.handleClick.bind(this,'del',ing['ingredient'], 'ingredient')} key={ing['ingredient']}>
                <Col xs={6}>
                  <b>{ing['ingredient']} </b>
                </Col>
                <Col xs={2}>
                  <small> {ing['amount']}</small>
                </Col>
                <Col xs={2}>
                  <small> {ing['unit']}</small>
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
                      componentClass={InputGroup.Button}
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
              <FormControl label="File" type="file" />
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
                    defaultValue="0:15">
                  <option value="0:15">0:15</option>
                  <option value="0:30">0:30</option>
                  <option value="0:45">0:45</option>
                  <option value="1:00">1:00</option>
                  <option value="1:30">1:30</option>
                  <option value="2:00">2:00</option>
                  <option value="4:00">4:00</option>
                  <option value="8:00">8:00</option>
                  <option value="24:00+">24:00+</option>
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
                <FormControl componentClass="select" placeholder="Enhet"
                    defaultValue="l" inputRef={(c) => this.unit = c }
                    onChange={this.handleChange.bind(this)} name="unit">
                  { this.makeUnits() }
                </FormControl>
              </Col>
              <Col xs={4} sm={2} className="noPadding">
                <Button onClick={this.addItem.bind(this,'in')} className="fillWidth">
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
          <Col sm={2}></Col>
          <Col id="submitCol" sm={8} xs={10}>
            <ButtonToolbar >
              <Button bsStyle="primary" bsSize="large"  onClick={this.handleSubmit.bind(this)}>
                Publicera  
              </Button>
              <Button bsSize="large" disabled  /*onClick={}*/>
                Spara utkast
              </Button>
              <Button bsSize="large" disabled /*onClick={}*/>
                Släng
              </Button>
            </ButtonToolbar>
          </Col>
        </Form>
      </div>
    );
  }
}

export default NewRecipe;
