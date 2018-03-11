import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
	Row,
	Col,
	Grid,
	Button,
	Glyphicon,
	PageHeader,
	InputGroup,
	FormControl,
	ToggleButton,
	ButtonToolbar,
	DropdownButton,
	ToggleButtonGroup
} from 'react-bootstrap';
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
      availableTags: [1],
      searchHeader: ""
  	};
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }

  async componentDidMount() {
		await RecipeStore.getTags();
		const searchFromUrl = this.props.match.params.searchterm ? this.props.match.params.searchterm : "";
		if(searchFromUrl) {
			const search = [];
			try {
				searchFromUrl.split('&').map(str => search.push(str.split('=').slice(1)));
				if(search[0].length>0 || search[1].length>0) {
					const tgs = [];
					search[0][0].split(',').map(fltr => tgs.push(parseInt(fltr,10)));
					const filteredTgs = tgs.filter(function(tag) {
						return (tag<RecipeStore.tags.length) });
					const searchTerm = search[1][0];
					await this.setState(prevState => ({
						filter: filteredTgs,
						searchWord: searchTerm,
						searchHeader: "Sökresultat"
					}));
					this.searchForm.value = searchTerm;
					await RecipeStore.searchOnMount(searchFromUrl)
				}
			}
			catch(e) {
				await RecipeStore.getAll();
				this.setState({ searchHeader:"Topplista" });
			}
		} else {
			await RecipeStore.getAll();
		}
		await this.setState({
			availableTags: RecipeStore.getTags()
		});
  }
	componentDidUpdate() {
	}

  async handleChangeSearch({ target }) {
    await this.setState({
      [target.name]: target.value
    });
    if(target.value.length === 0) {
      RecipeStore.searchFor(this.state.filter, "");
      if(this.state.filter.length===0){
        this.setState({searchHeader:"Topplista"});
        RecipeStore.getAll();
      }
    }
		this.makeUrl();
  }
  async addFilter({ target }) {
	 	if(target.value !== undefined) {
			if(!this.state.filter.includes(parseInt(target.value,10))) {
	  		await this.setState(prevState => ({
		  		filter: prevState.filter.concat(parseInt(target.value,10))
		  	}));
				console.log(this.state.filter);
				this.setState({ searchHeader:"Sökresultat" });
				await RecipeStore.searchFor(this.state.filter, this.state.searchWord);
			}
			else {
				await this.setState(prevState => ({
					filter: prevState.filter.filter(word => word !== parseInt(target.value,10))
				}));
				if(this.state.filter.length === 0 && this.state.searchWord.length===0) {
					this.setState({ searchHeader:"Topplista" });
					await RecipeStore.getAll();
				}
				else {
					this.setState({ searchHeader:"Sökresultat" });
					console.log("SÖK ändå");
					await RecipeStore.searchFor(this.state.filter, this.state.searchWord);
				}
			}
			this.makeUrl()
		}
  }

	makeUrl() {
		const tags = this.state.filter.length>0 ?
				("tags="+this.state.filter.join()) : "tags=";
		const searchWord = this.state.searchWord.length>0 ?
				("&q="+this.state.searchWord) : "&q=";
		this.props.history.push('/browse/'+tags+searchWord);
	}

  showRecipeCols() {
    let recipeCols = [];
    RecipeStore.recipes.forEach(function(recipe) {
      let ovenmittStyle = {
        height:"32px",
        paddingBottom:"7px",
				paddingLeft:"5px"
      };
      recipeCols.push(
        <Col className="grand-parent" xs={12} sm={6} lg={4}
          	key={recipe.id}>
					<a href={'/recipe/' + recipe.id } >
					<div className="parent">
						<BrowseImage id={recipe.id} />
	          <div className="op">
							<div>

	              <span>
	                { recipe.title }
	              </span>

	              <span id="span-right">
                  { recipe.Likes }
	                <img
										alt={recipe.id}
										src="/img/oven-like.svg"
										style={ovenmittStyle}
										className="pl"/>
	              </span>

		          </div>
						</div>
					</div>
				</a>
        </Col>
      );
    });
    return recipeCols;
  }

  searchTerm() {
    return(
      <div id="tag-bar">
        { this.showTags() }
      </div>
    );
  }
	showTags() {
		let tags = []
		this.state.filter.forEach(function(tag) {
			const tg = RecipeStore.tags.find(rsTag => {return rsTag.id===tag});
			tags.push(
					<span key={tg.id} className="tag"><b>#</b>{ tg.tag }</span>
			);
		});
		return tags;
	}

  handleSubmit(event) {
    if(this.state.searchWord.length>0 || this.state.filter.length>0) {
      RecipeStore.searchFor(this.state.filter, this.state.searchWord);
      this.setState({
        searchHeader: 'Sökresultat:'
      });
    }
    else{

    }
    event.preventDefault();
  }

  render() {
    return (
    	<div className="content">
    		<div id="search" >
		      <form onSubmit={this.handleSubmit}>
			      <InputGroup className="gr">
				      <FormControl bsSize="large" id="fc" type="text"
				        placeholder="Sök recept" name="searchWord"
								inputRef={((a) => this.searchForm = a)}
				        onChange={this.handleChangeSearch.bind(this)} />
				      <InputGroup.Addon id="addon" >
					  		<Button id="subBtn" type="submit" bsSize="large">
					  			<Glyphicon glyph="search" />
								</Button>
							</InputGroup.Addon>
				    </InputGroup>
		  		</form>

          <ButtonToolbar>
            <Col xs={3}>
              <DropdownButton title="Måltid" className="btns" id="a">
    			      <ToggleButtonGroup type="radio" name="meal"
                    value={this.state.filter}
        						onClick={this.addFilter.bind(this)}>
    				      <ToggleButton className="dropdownItem" value={1}>Förrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={2}>Huvudrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={3}>Efterrätt</ToggleButton>
    				      <ToggleButton className="dropdownItem" value={4}>Mellanmål</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>

            <Col xs={3}>
             	<DropdownButton title="Rättyp" className="btns" id="b">
  		          <ToggleButtonGroup type="radio" name="filter"
                      value={this.state.filter}
                      onClick={this.addFilter.bind(this)} >
      			      <ToggleButton className="dropdownItem" value={5}>Nattamat</ToggleButton>
      			      <ToggleButton className="dropdownItem" value={6}>Bakismat</ToggleButton>
                  <ToggleButton className="dropdownItem" value={7}>Veganskt</ToggleButton>
									<ToggleButton className="dropdownItem" value={11}>Pizza</ToggleButton>
									<ToggleButton className="dropdownItem" value={12}>Pasta</ToggleButton>
									<ToggleButton className="dropdownItem" value={13}>Burgare</ToggleButton>
									<ToggleButton className="dropdownItem" value={14}>Fisk</ToggleButton>
  				      </ToggleButtonGroup>
              </DropdownButton>
            </Col>

            <Col xs={3}>
              <DropdownButton title="Ingrediens" className="btns" id="c">
  		          <ToggleButtonGroup type="radio" name="filter"
  		      					value={this.state.filter}
          						onClick={this.addFilter.bind(this)}>
                  <ToggleButton className="dropdownItem" value={15}>Grönsaker</ToggleButton>
                  <ToggleButton className="dropdownItem" value={16}>Kött</ToggleButton>
                </ToggleButtonGroup>
              </DropdownButton>
            </Col>

            <Col xs={3}>
              <DropdownButton title="Specialkost" className="btns" id="d">
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
	      	{ this.showTags() }
        </div>
        <div>
	      </div>
				<PageHeader>
					{ this.state.searchHeader }
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

const BrowseImage = observer(class BrowseImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: "url('/img/food.png')", // default image
				backgroundAttachment: "fixed"
      }
    }
  }

  async componentDidMount() {
    // load recipe image & update styles if it exists
    const image = `/img/${this.props.id}.jpg`;
    const res = await fetch(image);
    if (res.ok) this.setState({
      style: {
        ...this.state.style,
        background: "url(" + image + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    })
  }

  render() {
    return (
			<div className="child" style={this.state.style}></div>

		);
  }
});


export default Browse;
