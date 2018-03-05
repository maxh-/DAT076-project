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
}
const Store = new RecipeStore();
export default Store;

window.rec = Store;