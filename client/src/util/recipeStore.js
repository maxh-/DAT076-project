import { extendObservable } from 'mobx';

class RecipeStore {
  constructor() {
    extendObservable(this, {
      recipes: [],
      recipe: [],
      tags: [],
      filter: "",
      authorId: "",
      image: ""
    });
  }
  async getOne(id) {
    await fetch('/api/recipe/'+id, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipe) {
          this.recipe = body.recipe;
        }
      });
  }
  getAll() {
    fetch('/api/recipe/top?limit=12', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipe) {
          this.recipes = body.recipe;
        }
      });
  }
  searchOnMount(term) {
    fetch('/api/recipe/search?'+term, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(body => {
        if(body.success && body.recipes) {
          this.recipes = body.recipes;
        }
      });
  }
  searchFor(tags, searchTerm) {
    let tag = "";
    let term = "";
    console.log(tags);
    if(tags.length === 0) { tag = ""; }
    else                  { tag = "tags="+tags.join(); }
    if(searchTerm.length === 0) { term = ""; }
    else                        { term = '&q=' + searchTerm; }
    console.log(tag + term);

    fetch('/api/recipe/search?'+tag+term, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(body => {
        console.log(body);
        if(body.success && body.recipes) {
          this.recipes = body.recipes;
        }
      });
  }
  async getTags() {
   await fetch('/api/tag/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.tags) {
          this.tags = body.tags;
        }
      });
  }
}
const Store = new RecipeStore();
export default Store;

window.rec = Store;
