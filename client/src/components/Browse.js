import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Glyphicon, Grid, Row, Col, Button, InputGroup,
	FormControl, DropdownButton, 
	ToggleButtonGroup, ToggleButton,
	PageHeader, ButtonToolbar } from 'react-bootstrap';
import './css/Browse.css';
import RecipeStore from '../util/recipeStore';


const Browse = observer(class Browse extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
    	searchWord: '',
  		filter: [],
      meal:"", 
      recipes: [],
      availableTags: []
  	};
    RecipeStore.getAll();
    RecipeStore.getTags();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("Måltid: " + this.state.meal);
  	//console.log(this.state.searchWord);
    console.log(this.state.filter);
	}

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  addFilter({ target }) {
    console.log(target.value);
		if(target.value !== undefined) {
			if(!this.state.filter.includes(parseInt(target.value,10))) {
	  		this.setState({
		  		filter: this.state.filter.concat(parseInt(target.value,10))
		  	});
			}
			else {
				this.setState({
					filter: this.state.filter.filter(word => word !== parseInt(target.value,10))
				});
			}
		}
  }
  showRecipeCols() {
    let dummyCols = [];
    RecipeStore.recipes.forEach(function(recipe) {
      dummyCols.push(
        <Col className="parent" xs={12} sm={6} lg={4} 
            key={recipe.id}>
          <div className="child">
          </div>
          <div className="op">
            <a href={'/recipe/' + recipe.id }>
              <span>
                { recipe.title }
              </span>
            </a>
          </div>
        </Col>   
      );
    });
    return dummyCols;
  }

  showTags() {
    RecipeStore.tags.forEach(function(tag) {

    });

  }
  searchTerm() {
    return(
      <div>
        <h2>{ this.state.searchWord } </h2>
        <h3>{ this.state.meal } </h3>
        <h4>{ this.state.filter } </h4>
      </div>
    );
  }

  handleSubmit(event) {
    alert('Searched for: ' + this.state.searchWord + 
      "\nFilters: " + this.state.filter);
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
              <DropdownButton title="Måltid" id="1">
    			      <ToggleButtonGroup type="radio" name="meal"
                    value={this.state.meal}
        						onClick={this.handleChange.bind(this)}>
    				      <ToggleButton className="dropdownItem" value={"1"}>Förrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={"2"}>Huvudrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={"3"}>Efterrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={"4"}>Mellanmål</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
             	<DropdownButton title="Rättyp" id="2">
  		          <ToggleButtonGroup type="radio" name="filter" 
                      value={this.state.filter}
                      onClick={this.addFilter.bind(this)} >
      			      <ToggleButton className="dropdownItem" value={5}>Nattamat</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={6}>Bakismat</ToggleButton>
                  <ToggleButton className="dropdownItem" value={7}>Veganskt</ToggleButton>
  				      </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
              <DropdownButton title="Ingrediens" id="3">
  		          <ToggleButtonGroup type="radio" name="filter"
  		      					value={this.state.filter}
          						onClick={this.addFilter.bind(this)}>
                  <ToggleButton className="dropdownItem" value={11}>Pizza</ToggleButton>
                  <ToggleButton className="dropdownItem" value={12}>Pasta</ToggleButton>
                  <ToggleButton className="dropdownItem" value={13}>Burgare</ToggleButton>
                  <ToggleButton className="dropdownItem" value={14}>Fisk</ToggleButton>
                  <ToggleButton className="dropdownItem" value={15}>Grönsaker</ToggleButton>
                  <ToggleButton className="dropdownItem" value={16}>Kött</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>
            <Col xs={3}>
              <DropdownButton title="Sepcialkost" id="4">
                <ToggleButtonGroup type="radio" name="filter" 
                      value={this.state.filter}
                      onClick={this.addFilter.bind(this)}>
      			      <ToggleButton className="dropdownItem" value={8}>lakto-vegetarianskt</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={9}>lakto-ovo-vegetarianskt</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={10}>ovo-vegetarianskt</ToggleButton>
                  <ToggleButton className="dropdownItem" value={17}>Glutenfritt</ToggleButton>

                </ToggleButtonGroup>  
              </DropdownButton>
            </Col>
				  </ButtonToolbar>
				</div>
        {this.showTags()}
				<div>
	      	<br/>
	      	testing purposes:
	      	<br/>
	      	{ this.searchTerm() }
	      </div>
				<PageHeader>
					Topplista
					<small> - filtreras allteftersom man väljer kategorier eller omgenereras vid sökning</small>
				</PageHeader>
	      <Grid className="gr">
			    <Row  className="show-grid" >
	          <Col >
				    	{ this.showRecipeCols() }
				    </Col>
		      </Row>
			  </Grid>
			</div>
    );
  }
});

export default Browse;
