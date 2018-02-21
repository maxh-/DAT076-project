import React, { Component } from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl,
  Button, Checkbox } from 'react-bootstrap';


class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      ingredients: [],
      step: "",
      steps: []
    }
    this.addIngredient = this.addIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }, event) {
    this.setState({
      [target.name]: target.value
    });
  }

  addIngredient = (event) => {
    if(event.key == 'Enter'){
      this.setState(prevState => ({
        ingredients: prevState.ingredients.concat(prevState.ingredient),
        ingredient: ""
      }));
      console.log(this.state.ingredients);
    }
  }
  addStep = (event) => {
    if(event.key == 'Enter'){
      this.setState(prevState => ({
        steps: prevState.steps.concat(prevState.step),
        step: ""
      }));
      console.log(this.state.ingredients);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.steps);
  }




  // render component
  render() {
  
    let ingrs = [];
    this.state.ingredients.forEach(function(ingr) {
      ingrs.push(
          <li key={ingr}> { ingr } </li>
        );
    });
    let stps = [];
    this.state.steps.forEach(function(stp) {
      stps.push(
          <li key={stp}> { stp } </li>
        );
    });

    return (
      <div className="NewRecipe">
        <Form horizontal>
          <FormGroup controlId="titel">
            <Col componentClass={ControlLabel} sm={2}>
              Titel
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Titel" />
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

          <FormGroup controlId="beskrivning">
            <Col sm={2} componentClass={ControlLabel}>
              Beskrivning
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" placeholder="Beskrivning" />
            </Col>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
            <Col componentClass={ControlLabel} sm={2}>
                Ingredienser
            </Col>
            <Col sm={10}>            
              <FormControl
                type="text"
                placeholder="Enter ingredient"
                name="ingredient"
                value={this.state.ingredient}
                onChange={this.handleChange}
                onKeyPress={this.addIngredient.bind(this)}
              />
              <ul>
                { ingrs }
              </ul>
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
                value={this.state.step}
                onChange={this.handleChange}
                onKeyPress={this.addStep.bind(this)}
              />
              <ol>
                { stps }
              </ol>
            </Col>
          </FormGroup>

        </Form>
      </div>
    );
  }
}

export default NewRecipe;
