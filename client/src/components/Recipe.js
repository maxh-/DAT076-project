import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, PageHeader,
  Glyphicon, Button } from 'react-bootstrap';
import bild from './bild.jpg';
import './css/Recipe.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Spaghetti Carbonara",
      upVotes: "1",
      downVotes: "5421",
      time: "30",
      description:"Spaghetti carbonara – en älskad favorit med rökt fläsk eller bacon och grädde! Lika bra till släktmiddagen som till fredagsmyset.",
      ingredients: [["spaghetti", 300, "g"], ["rökt fläsk", 150, "g"], ["vispgrädde", 0.5, "dl"]],
      steps: ["Koka spaghettin", "Skär fläsket i små tärningar. Stek fläsket knaprigt i smör i en stekpanna","Vispa ihop grädde, salt, vitlök och hälften av osten","Rör ner fläsk och ostblandningen i den kokta spaghettin"]
    }
  }
  // render component
  render() {
    let c = 0;
    let ingrs = [];
    this.state.ingredients.forEach(function(ingr) {
      ingrs.push(
          <li key={c}> 
            <b>{ ingr[0] }</b>
            <small>{ ingr[1] }{ ingr[2]}</small>
          </li>
        );
      c++;
    });
    let stps = [];
    this.state.steps.forEach(function(stp) {
      stps.push(
          <li key={c}> 
            { stp } 
          </li>
        );
      c++;
    });

    return (
      <div id="recipe">
        <img src={bild} id="pic" />
        <Jumbotron>
          <h1> { this.state.title } </h1>
          <p>
            <Glyphicon glyph=" glyphicon glyphicon-thumbs-up "  />
            <small>({ this.state.upVotes })</small>
            <Glyphicon glyph=" glyphicon glyphicon-thumbs-down "  />
            <small>({ this.state.downVotes })</small>
            <Glyphicon glyph=" glyphicon glyphicon glyphicon-time " id="gl-space" />
            <small> {this.state.time} minuter </small>


          </p>
          <p>
           { this.state.description }
          </p>
        </Jumbotron>
        <hr/>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4} id="ingrs"  className="lis">
              <h1> Ingredienser </h1>
              <ul>
                { ingrs }
              </ul>
            </Col>
            <vr />
            <Col xs={12} md={8} id="steps" className="lis">
              <h1> Instruktioner </h1>
              <ol>
                <li>Koka spaghettin.</li>
                <li>Skär fläsket i små tärningar. Stek fläsket knaprigt i smör i en stekpanna.</li>
                <li>Vispa ihop grädde, salt, vitlök och hälften av osten.</li>
                <li>Rör ner fläsk och ostblandningen i den kokta spaghettin </li>
              </ol>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Recipe;
