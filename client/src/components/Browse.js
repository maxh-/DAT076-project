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
    this.state = {
    	searchWord: '',
  		typ: '1',
  		ingrediens: '2',
  		ursprung: '3',
  		spec: '4'
  	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    console.log(this.state.searchWord);
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
		  			<DropdownButton id="leftBtn" title="Måltid">
							<ToggleButtonGroup name="typ" type="radio" defaultValue={1}>
					      <ToggleButton bsSize="small" value={1.1} 
					      	onClick={this.handleChange}>Förrätt</ToggleButton>
					      <ToggleButton bsSize="small" value={1.2} 
					      	onClick={this.handleChange} >Huvudrätt</ToggleButton>
					      <ToggleButton bsSize="small" value={1.3}
					      	onClick={this.handleChange} >Efterrätt</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
		  			<DropdownButton title="Ingrediens">
							<ToggleButtonGroup type="radio" name="ingrediens" defaultValue={2}>
					      <ToggleButton bsSize="small" value={2.1} 
					      	onClick={this.handleChange} >Fisk</ToggleButton>
					      <ToggleButton bsSize="small" value={2.2} 
					      	onClick={this.handleChange} >Grönsaker</ToggleButton>
					      <ToggleButton bsSize="small" value={2.3}
					      	onClick={this.handleChange} >Kött</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
					  <DropdownButton title="Ursprung">
							<ToggleButtonGroup type="radio" name="ursprung" defaultValue={3}>
					      <ToggleButton bsSize="small" value={3.1} 
					      	onClick={this.handleChange} >Thailand</ToggleButton>
					      <ToggleButton bsSize="small" value={3.2}
					      	onClick={this.handleChange} >Italien</ToggleButton>
					      <ToggleButton bsSize="small" value={3.3}
					      	onClick={this.handleChange}>Brasilien</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
		  			<DropdownButton id="rightBtn" title="Specialkost" >
					  	<ToggleButtonGroup type="radio" name="spec" defaultValue={4} onClick={this.handleChange}>
					      <ToggleButton bsSize="small" value={4.1}>Laktosfritt</ToggleButton>
					      <ToggleButton bsSize="small" value={4.2}>Glutenfritt</ToggleButton>
					      <ToggleButton bsSize="small" value={4.3}>Veganskt</ToggleButton>
					    </ToggleButtonGroup>
					  </DropdownButton>
					</ButtonGroup>




		      <Form inline id="fo">
			      <InputGroup className="gr">
				      <FormControl bsSize="large" id="fc" type="text"  
				      placeholder="Sök recept" name="searchWord" 
				      value={this.state.searchWord} onChange={this.handleChange} />
				      <InputGroup.Addon type="submit" id="addon" >
					  		<Button id="subBtn" name="searchWord"
					  			onclick={console.log(this.state.searchWord)} bsSize="large">        		
					  			<Glyphicon glyph="search" />
								</Button>			      
							</InputGroup.Addon>
				    </InputGroup>
					</Form>
				</div>
				<div>
	      	{ this.state.searchWord }
	      </div>
	      <Grid className="gr">
			    <Row  className="show-grid" >
	          <Col sm={{ size: 12, offset: 4 }} md={{ size: 8, offset: 2 }} 
	          	lg={{ size: 8, offset: 2 }}>
				    	{ dummyCols }
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
}

export default Browse;
