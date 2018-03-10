import { extendObservable, action } from 'mobx';
import { get } from 'axios';

class UserRecipeStore {
  constructor(authorId) {
    extendObservable(this, {
      recipes: [],
      id: authorId,
      update: action(async () => {
        const id = this.id;
        this.recipes = [];
        this.recipes = await get(`/api/user/${id}/recipes`).then(res => {
          return res.data.message;
        });
      })
    });
  }
}

export default UserRecipeStore;
