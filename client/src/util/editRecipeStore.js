import { extendObservable, action } from 'mobx';
import { get } from 'axios';
import { extend } from 'underscore';

class EditRecipeStore {
  constructor(recipeId) {
    this.recipe = {};
    extendObservable(this, {
      recipe: {},
      id: recipeId,
      units: [],
      allTags: [],
      allIngredients: [],
      allMealTypes: [],
      nonSelectedTags: [],
      mealType: {}, // selected mealType tag
      otherTags: [], // selected "regular" tags
      update: action(async () => {
        // fetch & filter tags according to type
        await get(`/recipe/${this.id}`).then(res => {
          this.recipe = extend(res.data.recipe, {ingredients: []});
          this.recipe['ingredients'] = res.data.RecipeIngredients;
          this.mealType = getMealType(res.data.recipe.Tags);
        });
        await get(`/tag`).then(res => {
          this.allTags = res.data.tags.filter(tag => {
            return ![1, 2, 3, 4].includes(tag.id);
          })
          this.allMealTypes = filterTags(res.data.tags, [1, 2, 3, 4]);
        });
        this.updateTags();
        get('/unit').then(res => this.units = res.data.recipe);
        get('/ingredient').then(res => this.allIngredients = res.data.recipe);
      }),
      updateTags: () => {
        // update tags
        this.otherTags = this.recipe.Tags.filter(tag => {
          return !this.allMealTypes.find(mealTypeTag => {
            return mealTypeTag.id === tag.id;
          });
        });
        this.nonSelectedTags = this.allTags.filter(tag => {
          return !this.otherTags.find(otherTag => {
            return otherTag.id === tag.id;
          });
        })
      },
      setMealType: (id) => {
        // Set the mealType tag and update recipe tags accordingly
        const oldMealType = this.mealType;
        const newMealType = this.allMealTypes.find(tag => {
          return tag.id === parseInt(id, 10);
        });
        this.mealType = newMealType;
        const replaceIndex = this.recipe.Tags.findIndex(tag => {
          return tag.id === oldMealType.id;
        })
        this.recipe.Tags[replaceIndex] = newMealType;
      },
      selectTag(id) {

      },
      deselectTag(id) {

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