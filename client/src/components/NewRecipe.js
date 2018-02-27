import React, { Component } from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, InputGroup, Glyphicon, ToggleButton,
  ListGroup, ListGroupItem, ToggleButtonGroup,   } from 'react-bootstrap';
import './css/NewRecipe.css';

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingr: "",
      am: "",
      un: "",
      ingredients: [],
      step: "",
      steps: [],
      stepIndex:1,
      time: "0:15",
      description: "",
      title: "",
      meal: "appetizer",
      tags: ["#fisk", "#3"]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createIngredients = this.createIngredients.bind(this);
    this.createSteps = this.createSteps.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleObjectChange({ target }) {
    var x = this.state.steps.filter(function(obj) {
      return obj['id'] === target.name;
    });
    x={id:parseInt(target.name,10),step:target.value};
    let newSteps = [];
    this.state.steps.forEach((element) => {
      if(element.id === x.id) {
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
      if(type === 'ingr') {
        var filteredItems = this.state.ingredients.filter(function (item) {
          return (item['ingr'] !== key);
        });
        this.setState({
          ingredients: filteredItems
        });      
      }
      else if(type==='id') {
        let filteredItems = [];
        let stepCounter = 1;
        this.state.steps.forEach(function(step) {
          if(step['id'] === key ) {
          }
          else {
            if(step.id === stepCounter) {
              filteredItems.push(step);
            }else {
              step.id = stepCounter;
              filteredItems.push(step);
            }
            stepCounter++;
          }
        });
        this.setState(prevState => ({
          steps: filteredItems,
          stepIndex: stepCounter
        }));              
      } 
    }
  }

  addStep = (e) => {
    if(e.key === 'Enter'){
      let id = this.state.stepIndex;
      let step = this.stp.value;
      if(step.length > 1) {
        this.setState(prevState => ({
          steps: prevState.steps.concat({id,step}),
          stepIndex: prevState.stepIndex+1,
        }));
        this.stp.value = "";
      }
      e.preventDefault();
    }
  }

  addItem = (e) => {
    var ingr  = this.ingr.value;
    var am    = this.am.value;
    var un    = this.un.value;
    this.setState(prevState => ({
      ingredients: prevState.ingredients.concat({ingr, am, un}),
    }));
    this.ingr.value = "";
    this.am.value = "";
    this.am.value = "";
  }

  addTags({ target }) {
    if(target.value !== undefined) {
      if(!this.state.tags.includes(target.value)) {
        this.setState({
          tags: this.state.tags.concat(target.value)
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
    return    <ListGroupItem onClick={this.handleClick.bind(this,'del',ing['ingr'], 'ingr')} key={ing['ingr']}>
                <Col xs={6}>
                  <b>{ing['ingr']} </b>
                </Col>
                <Col xs={2}>
                  <small> {ing['am']}</small>
                </Col>
                <Col xs={2}>
                  <small> {ing['un']}</small>
                </Col>
              </ListGroupItem>
  }

  createSteps(stp) {
    return    <li key={stp['id']}>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>{stp['id']}</InputGroup.Addon>
                    <FormControl type="text" 
                      value={stp['step']}
                      onChange={this.handleObjectChange.bind(this)}
                      name={stp['id']}/>
                    <InputGroup.Button
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title="Action">
                    <Button onClick={this.handleClick.bind(this, 'del', stp['id'], 'id')}>
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
      <div id="NewRecipe">
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
                <FormControl componentClass="select" placeholder="select"
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
                <FormControl componentClass="select" placeholder="select"
                    value={this.state.meal}
                    onChange={this.handleChange.bind(this)}
                    name="meal"
                    defaultValue="appetizer">
                  <option value="appetizer">Förrätt</option>
                  <option value="main">Huvudrätt</option>
                  <option value="dessert">Efterrätt</option>
                  <option value="snack">Mellanmål</option>
                </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="beskrivning">
            <Col sm={2} componentClass={ControlLabel}>
              Beskrivning
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" placeholder="Beskrivning"
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
                <ToggleButton value={"#förrätt"}>förrätt</ToggleButton>
                <ToggleButton value={"#fisk"}>fisk</ToggleButton>
                <ToggleButton value={"#3"}>3</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText">
            <Col xs={12} componentClass={ControlLabel} sm={2}>
                Ingredienser
            </Col>
            <Col xs={12} sm={10}>            
              <Col sm={6} className="p">
                <FormControl
                  type="text"
                  placeholder="Ingrediens"
                  inputRef={(a) => this.ingr = a} 
                />
              </Col>
              <Col xs={4} sm={2} className="p">            
                <FormControl
                  type="text"
                  placeholder="Mängd"
                  inputRef={(b) => this.am = b} 
                />
              </Col>
              <Col xs={4} sm={2} className="p">            
                <FormControl componentClass="select" placeholder="Enhet"
                    defaultValue="l" inputRef={(c) => this.un = c }>
                  <option value="dl">dl</option>
                  <option value="st">st</option>
                  <option value="dussin st">dussin st</option>
                  <option value="hundra st">hundra st</option>
                </FormControl>
              </Col>
              <Col xs={4} sm={2} className="p">
                <Button onClick={this.addItem.bind(this,'in')} className="hundred">
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
                name="step"
                inputRef={(a) => this.stp = a}
                onKeyPress={this.addStep.bind(this)}
              />
            </Col>
            <Col sm={2}> </Col>

            <Col sm={10}> 
              <ol id="ol"> { stpsItems } </ol>      
            </Col>
          </FormGroup>
          <Col sm={2}></Col>
          <Col id="submitCol" sm={8} xs={10}>
            <ButtonToolbar >
              <Button bsStyle="primary" bsSize="large" disabled  /*onClick={}*/>
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
