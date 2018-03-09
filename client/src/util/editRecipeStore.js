import { extendObservable, action } from 'mobx';
import { get } from 'axios';
import Auth from './AuthService'

class EditRecipeStore {
  constructor(recipeId) {
    extendObservable(this, {
      recipe: {},
      id: recipeId,
      allTags: [], 
      allMealTypes: [],
      mealType: {}, // mealType tag
      otherTags: [], // "regular" tags
      update: action(async () => {
        await get(`/recipe/${this.id}`).then(res => {
          this.recipe = res.data.recipe;
          this.mealType = getMealType(res.data.recipe.Tags);
        });
        await get(`/tag`).then(res => {
          this.allTags = res.data.tags;
          this.allMealTypes = filterTags(res.data.tags, [1, 2, 3, 4]);
        });
        this.otherTags = this.recipe.Tags.filter(tag => {
          return !this.allMealTypes.includes(tag);
        });
      }),
      setMealType: (id) => {
        const oldMealType = this.mealType;
        const newMealType = this.allMealTypes.find(tag => {
          return tag.id === parseInt(id);
        });
        this.mealType = newMealType;
        const replaceIndex = this.recipe.Tags.findIndex(tag => {
          return tag.id === oldMealType.id;
        })
        this.recipe.Tags[replaceIndex] = newMealType;
      }
    })
  }

  getTag(id) {
    return this.allTags.find(tag => tag.id === id);
  }
}

const filterTags = (tags, tagIDs) => {
  return tags.filter(tag => tagIDs.includes(tag.id));
}

const getMealType = (tags) => {
  const mealTypeTagIDs = [1, 2, 3, 4];
  return tags.find(tag => mealTypeTagIDs.includes(tag.id));
}

export default EditRecipeStore;

window.ers = new EditRecipeStore(2);