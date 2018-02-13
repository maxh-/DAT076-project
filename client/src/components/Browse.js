import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './css/Browse.css';

  const dummySentences = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'Donec hendrerit tempor tellus.',
  'Donec pretium posuere tellus.',
  'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  'Nulla posuere.',
  'Donec vitae dolor.',
  'Nullam tristique diam non turpis.',
  'Cras placerat accumsan nulla.',
  'Nullam rutrum.',
  'Nam vestibulum accumsan nisl.'];
class Browse extends Component {
	
	constructor(props) {
    super(props);
    this.state = {searchWord: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
  	var dummyCols = [];
		for (var i = 0; i < 20; i++) {
		  dummyCols.push(
		  	<Col className="co" xs={6} sm={4} md={3} lg={2} key={i}>
			  	{dummySentences.slice(0, 4).join(' ')}
			  </Col>);
		}
    return (
    	<div className="content">
	      <FormGroup bsSize="large" onSubmit={this.handleSubmit}>
	        <ControlLabel>
	        	<FormControl type="text" placeholder="Sök recept" value={this.state.value} onChange={this.handleChange} />
	        </ControlLabel>
	        <Button type="submit" value="Submit" bsSize="large">Sök</Button>
	        <br />
	      	{ this.state.value }
	      </FormGroup>
	      <Grid>
			    <Row  className="show-grid" >
	          <Col sm="12" md={{ size: 8, offset: 2 }}>
				    	{dummyCols}
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
}

export default Browse;
