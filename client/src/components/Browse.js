import React, { Component } from 'react';
import { Glyphicon, Grid, Row, Col, Button, InputGroup,
	FormControl, DropdownButton, 
	ToggleButtonGroup, ToggleButton,
	PageHeader, ButtonToolbar } from 'react-bootstrap';
import './css/Browse.css';

  const dummySentence = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit';

class Browse extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
    	searchWord: '',
  		typ: '',
  		filter: [],
      meal:"", 
      recipe:""
  	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }

  componentDidMount() {
    let i = 1;
    fetch('/recipe/'+i, {
      method: 'get',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({recipe: res.recipe});
      }
    ); 
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("Måltid: " + this.state.meal);
  	//console.log(this.state.searchWord);
  	//console.log(this.state.filter);
    console.log("recept: ");
    console.log(this.state);
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
  recipeCols() {
    let dummyCols = [];
    for(let i = 0; i < 6; i++) {
      dummyCols.push(
        <Col className="parent" xs={12} sm={6} lg={4} 
            key={this.state.recipe.id}>
          <div className="child">
          </div>
          <div className="op">
            <a href={'/recipe' + this.state.recipe.id }>
              <span>
                {this.state.recipe.title}
              </span>
            </a>
          </div>
        </Col>);
    }
    return dummyCols;
  }

  handleSubmit(event) {
    alert('Searched for: ' + this.state.searchWord);
    event.preventDefault();
  }

  render() {
		//Switch för splash och sök?
    return (
    	<div className="content">
    		<div id="search" >
		      <form onSubmit={this.handleSubmit}>
			      <InputGroup className="gr">
				      <FormControl bsSize="large" id="fc" type="text"  
				        placeholder="Sök recept" name="searchWord" 
				        onChange={this.handleChange.bind(this)} />
				      <InputGroup.Addon id="addon" >
					  		<Button id="subBtn" type="submit" bsSize="large">        		
					  			<Glyphicon glyph="search" />
								</Button>			      
							</InputGroup.Addon>
				    </InputGroup>
		  		</form>
          <ButtonToolbar>
            <Col xs={3}>
              <DropdownButton title="Måltid">
    			      <ToggleButtonGroup type="radio" name="meal"  
          						onClick={this.handleChange.bind(this)}>
    				      <ToggleButton className="dropdownItem" value={'#förrätt'}>Förrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={'#huvudrätt'}>Huvudrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={'#efterrätt'}>Efterrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={'#mellanmål'}>Mellanmål</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
             	<DropdownButton title="Rättyp">
  		          <ToggleButtonGroup type="radio" name="filter" 
                      value={this.state.filter}
                      onClick={this.addFilter.bind(this)} >
      			      <ToggleButton className="dropdownItem" value={'#pizza'}>Pizza</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={'#pasta'}>Pasta</ToggleButton>
                  <ToggleButton className="dropdownItem" value={'#burgare'}>Burgare</ToggleButton>
  				      </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
              <DropdownButton title="Ingrediens">
  		          <ToggleButtonGroup type="radio" name="filter"
  		      					value={this.state.filter}
          						onClick={this.addFilter.bind(this)}>
      			      <ToggleButton className="dropdownItem" value={'#fisk'}>Fisk</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={'#grönsaker'}>Grönsaker</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={'#kött'}>Kött</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
              <DropdownButton title="Sepcialkost">
                <ToggleButtonGroup type="radio" name="filter" 
  		      					value={this.state.filter}
          						onClick={this.addFilter.bind(this)}>
      			      <ToggleButton className="dropdownItem" value={'#glutenfritt'}>Glutenfritt</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={'#veganskt'}>Veganskt</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={'#laktosfritt'}>Laktosfritt</ToggleButton>
                </ToggleButtonGroup>  
              </DropdownButton>
            </Col>
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
				    	{ this.recipeCols() }
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
				    	{ this.recipeCols() }
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
}

export default Browse;
