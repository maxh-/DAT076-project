import { extendObservable, action } from 'mobx';
import { get } from 'axios';

class EditRecipeStore {
  constructor(recipeId) {
    extendObservable(this, {
      recipe: {},
      id: recipeId,
      allTags: [],
      allMealTypes: [],
      nonSelectedTags: [],
      mealType: {}, // selected mealType tag
      otherTags: [], // selected "regular" tags
      update: action(async () => {
        // fetch & filter tags according to type
        await get(`/recipe/${this.id}`).then(res => {
          this.recipe = res.data.recipe;
          this.mealType = getMealType(res.data.recipe.Tags);
        });
        await get(`/tag`).then(res => {
          this.allTags = res.data.tags.filter(tag => {
            return ![1, 2, 3, 4].includes(tag.id);
          })
          this.allMealTypes = filterTags(res.data.tags, [1, 2, 3, 4]);
        });
        this.updateTags();
      }),
      updateTags: () => {
        this.otherTags = this.recipe.Tags.filter(tag => {
          return !this.allMealTypes.find(mealTypeTag => {
            return mealTypeTag.id === tag.id;
          })
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
          return tag.id === parseInt(id);
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