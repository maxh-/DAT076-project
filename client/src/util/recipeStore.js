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
  getOne(id) {
    fetch('/recipe/'+id, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipe) {
          this.recipe = body.recipe;
        }
      });
  }
  like(id,token) {
    fetch('/recipe/'+id+'/like', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+ token
        },
        method: 'POST',
        body: JSON.stringify({
          kind : "up" 
        })
    })
    .then((body) => {
      if(body.ok) {
        this.getOne(id);
      }
      else {
        fetch('/recipe/'+id+'/like', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+ token
          },
          method: 'DELETE',
        })
        .then(body =>  {
          this.getOne(id);
        })
        .catch(error => console.log("Kunde inte ogilla"));
      }
    })
    .catch(error => console.log("Kunde inte gilla"));
  }
  getAll() {
    fetch('/recipe/top?limit=12', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((body) => {
        if(body.success && body.recipe) {
          this.recipes = body.recipe;
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
    tgs.forEach(function(tg){
      ts += "#"+(tags.find(function(tag){ return tag.id===tg; })).tag
    });
    return ts;
  }
      

}
const Store = new RecipeStore();
export default Store;

window.rec = Store;