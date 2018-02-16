import React, { Component } from 'react';
import { Form, Glyphicon, Grid, Row, Col, Button, InputGroup,
	FormGroup, ControlLabel, FormControl, ButtonGroup, 
	DropdownButton, MenuItem, ToggleButtonGroup, ToggleButton,
	 } from 'react-bootstrap';
import './css/Browse.css';

  const dummySentences = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'Donec hendrerit tempor tellus.',
  'Donec pretium posuere tellus.',
  'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.'];
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
  	let dummyCols = [];
		for(let i = 0; i < 20; i++) {
		  dummyCols.push(
		  	<Col className="co" xs={6} sm={6} md={4} lg={3} key={i}>
			  	{dummySentences.slice(0, 4).join(' ')}
			  </Col>);
		}
		//Switch för splash och sök?
    return (
    	<div className="content">
    		<div id="search" >
		      <ButtonGroup  id="btnGrp" justified >
		  			<DropdownButton id="leftBtn" title="Kategori">
							<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
					      <ToggleButton bsSize="small" value={1}>Radio 1 (pre-checked)</ToggleButton>
					      <ToggleButton bsSize="small" value={2}>Radio 2</ToggleButton>
					      <ToggleButton bsSize="small" value={3}>Radio 3</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
		  			<DropdownButton title="Huvudingrediens">
							<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
					      <ToggleButton bsSize="small" value={1}>Radio 1 (pre-checked)</ToggleButton>
					      <ToggleButton bsSize="small" value={2}>Radio 2</ToggleButton>
					      <ToggleButton bsSize="small" value={3}>Radio 3</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
					  <DropdownButton title="Ursprung">
							<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
					      <ToggleButton bsSize="small" value={1}>Radio 1 (pre-checked)</ToggleButton>
					      <ToggleButton bsSize="small" value={2}>Radio 2</ToggleButton>
					      <ToggleButton bsSize="small" value={3}>Radio 3</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
		  			<DropdownButton id="rightBtn" title="Typ av rätt">
					  	<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
					      <ToggleButton bsSize="small" value={1}>Radio 1 (pre-checked)</ToggleButton>
					      <ToggleButton bsSize="small" value={2}>Radio 2</ToggleButton>
					      <ToggleButton bsSize="small" value={3}>Radio 3</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
					</ButtonGroup>




		      <Form inline id="fo">
		      <InputGroup className="gr">
			      <FormControl bsSize="large" id="fc" type="text" placeholder="Sök recept" value={this.state.value} onChange={this.handleChange}   />
			      <InputGroup.Addon type="submit" id="addon" >
				  		<Button id="subBtn" type="submit"bsSize="large">        		
				  			<Glyphicon glyph="search" />
							</Button>			      
						</InputGroup.Addon>
			    </InputGroup>
					</Form>
				</div>
	      	{ this.state.value }
	      <Grid className="gr">
			    <Row  className="show-grid" >
	          <Col sm={{ size: 12, offset: 4 }} md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
				    	{dummyCols}
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
}

export default Browse;
