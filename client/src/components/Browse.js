import React, { Component } from 'react';
import { Glyphicon, Grid, Row, Col, Button, InputGroup,
	FormControl, 
	ToggleButtonGroup, ToggleButton,
	PageHeader, ButtonToolbar } from 'react-bootstrap';
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
  		typ: '',
  		filter: []
  	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
  	console.log(this.state.searchWord);
  	console.log(this.state.filter);
	}

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });

  }

  addFilter({ target }) {
		if(target.value !== undefined) {
			if(!this.state.filter.includes(target.value)) {
	  		this.setState({
		  		filter: this.state.filter.concat(target.value)
		  	});
			}
			else {
				this.setState({
					filter: this.state.filter.filter(word => word !== target.value)
				});
			}
		}
  }

  handleSubmit(event) {
    alert('Searched for: ' + this.state.searchWord);
    event.preventDefault();
  }

  render() {
  	let dummyCols = [];
		for(let i = 0; i < 12; i++) {
		  dummyCols.push(
		  	<Col className="co" xs={6} sm={6} md={4} lg={3} key={i}>
			  	{dummySentences.slice(0, 4).join(' ')}
			  </Col>);
		}

		//Switch för splash och sök?
    return (
    	<div className="content">
    		<div id="search" >

		      <form onSubmit={this.handleSubmit}>
			      <InputGroup className="gr">
				      <FormControl bsSize="large" id="fc" type="text"  
				      placeholder="Sök recept" name="searchWord" 
				       onChange={this.handleChange} />
				      <InputGroup.Addon id="addon" >
					  		<Button id="subBtn" type="submit" bsSize="large">        		
					  			<Glyphicon glyph="search" />
								</Button>			      
							</InputGroup.Addon>
				    </InputGroup>
				  </form>

				  <ButtonToolbar>
				    <ToggleButtonGroup type="radio" name="filter" 
				    				value={this.state.filter}
        						onClick={this.addFilter.bind(this)} >
				      <ToggleButton value={'#förrätt'}>Förrätt</ToggleButton>
				      <ToggleButton value={'#huvudrätt'}>Huvudrätt</ToggleButton>
				      <ToggleButton value={'#efterrätt'}>Efterrätt</ToggleButton>
				      <ToggleButton value={'#mellanmål'}>Mellanmål</ToggleButton>
				      <ToggleButton value={'#pizza'}>Pizza</ToggleButton>
				      <ToggleButton value={'#pasta'}>Pasta</ToggleButton>
				      <ToggleButton value={'#burgare'}>Burgare</ToggleButton>
				      <ToggleButton value={'#fisk'}>Fisk</ToggleButton>
				      <ToggleButton value={'#grönsaker'}>Grönsaker</ToggleButton>
				      <ToggleButton value={'#kött'}>Kött</ToggleButton>
				      <ToggleButton value={'#glutenfritt'}>Glutenfritt</ToggleButton>
				      <ToggleButton value={'#veganskt'}>Veganskt</ToggleButton>
				      <ToggleButton value={'#laktosfritt'}>Laktosfritt</ToggleButton>
						</ToggleButtonGroup>
				  </ButtonToolbar>
				</div>

				<div>
	      	<br/>
	      	testing purposes from here
	      	<br/>
	      	{ this.state.searchWord }
	      </div>
				<PageHeader>
					Topplista
					<small> - filtreras allteftersom man väljer kategorier eller omgenereras vid sökning</small>
				</PageHeader>
	      <Grid className="gr">
			    <Row  className="show-grid" >
	          <Col >
				    	{ dummyCols }
				    </Col>
		      </Row>
			  </Grid>
			  <PageHeader>
					Senast visat
					<small> - filtreras allteftersom man väljer kategorier</small>
				</PageHeader>
	      <Grid className="gr">
			    <Row  className="show-grid" >
	          <Col >
				    	{ dummyCols }
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
}

export default Browse;
