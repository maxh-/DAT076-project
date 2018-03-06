import { extendObservable } from 'mobx';

class RecipeStore {
  constructor() {    
    extendObservable(this, {
      recipes: [],
      tags: [],
      filter: "",
      authorId: ""
    });
  }
  getAll() {
    fetch('/recipe/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipe) {
          this.recipes = body.recipe;
          //console.log(body.recipe);
        }
      });
  }
  searchFor(tags, searchTerm) {
    let tag = "";
    let term = "";

    if(tags.length === 0) {
      tag = "";
    } 
    else {
      tag = "tags="+tags.join();

    }
    if(searchTerm.length === 0) {
      term = "";
    } 
    else {
      term = '&q=' + searchTerm;
    }
    fetch('/recipe/search?'+tag+term, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipes) {
          this.recipes = body.recipes;
        }
      });
  }
  getTags() {
   fetch('/tag/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.tags) {
          this.tags = body.tags;
        }
      });
  }
  getMyTags(tgs){
    let ts="";
    let tags = this.tags;
    console.log(tags);
    tgs.forEach(function(tg){
      ts += "#"+(tags.find(function(tag){ return tag.id===tg; })).tag
    });
    return ts;
  }
      

}
const Store = new RecipeStore();
export default Store;

window.rec = Store;