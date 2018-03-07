import { extendObservable, action } from 'mobx';
import { get } from 'axios';

class UserRecipeStore {
  constructor(authorId) {
    extendObservable(this, {
      author: props.authorId,
      recipes: [],
      fetchRecipes: action(async () => {
        this.recipes = [];
        //this.recipes = get(`/user/${this.authorId}/recipes`);
        const res = await get(`/user/${this.authorId}/recipes`);
        console.log(res);
      })
    })
  }
}

export default UserRecipeStore;