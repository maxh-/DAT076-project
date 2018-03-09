const models = require('../models');
const recipeController = require('../controllers/recipeController');

exports.fill = async () => {
  // Users
  models.User.create({firstName: "Test", lastName: "User", email:"test@test.se", password:"testpass"});
  models.User.create({firstName: "Noreply", lastName: "Receptsidan", email:"noreplyrecept@gmail.com", password:"testpass"});
  models.User.create({firstName: "David", lastName: "Berg Marklund", email:"david@bergmarklund.se", password:"testpass"});
  models.User.create({firstName: "Linus", lastName: "Nilsson", email:"lnsnlssn@gmail.com", password:"testpass"});
  models.User.create({firstName: "Max", lastName: "Hansson", email:"maxh88@gmail.com", password:"testpass"});
  models.User.create({firstName: "Adis", lastName: "Mahmutovic", email:"adde38@live.com", password:"testpass"});

  // units
  await models.Unit.create({name: "Liter", abbreviation: "l"});
  await models.Unit.create({name: "Deciliter", abbreviation: "dl"});
  await models.Unit.create({name: "Centiliter", abbreviation: "cl"});
  await models.Unit.create({name: "Milliliter", abbreviation: "ml"});
  await models.Unit.create({name: "Styck", abbreviation: "st"});
  await models.Unit.create({name: "Kilogram", abbreviation: "kg"});
  await models.Unit.create({name: "Hekto", abbreviation: "hg"});
  await models.Unit.create({name: "Gram", abbreviation: "g"});

  // tags

  await models.Tag.create({tag: "förrätt"});
  await models.Tag.create({tag: "huvudrätt"});
  await models.Tag.create({tag: "efterrätt"});
  await models.Tag.create({tag: "mellanmål"});
  await models.Tag.create({tag: "nattamat"});
  await models.Tag.create({tag: "bakismat"});
  await models.Tag.create({tag: "veganskt"});
  await models.Tag.create({tag: "lakto-vegitarianskt"});
  await models.Tag.create({tag: "lakto-ovo-vegitarianskt"});
  await models.Tag.create({tag: "ovo-vegitarianskt"});
  await models.Tag.create({tag: "pizza"});
  await models.Tag.create({tag: "pasta"});
  await models.Tag.create({tag: "burgare"});
  await models.Tag.create({tag: "fisk"});
  await models.Tag.create({tag: "grönsaker"});
  await models.Tag.create({tag: "kött"});
  await models.Tag.create({tag: "glutenfritt"});
  await models.Tag.create({tag: "laktosfritt"});

  // ingredienser
  await models.Ingredient.create({name: "Röda Linser"});
  await models.Ingredient.create({name: "Havremjölk"});
  await models.Ingredient.create({name: "Jordnötter"});
  await models.Ingredient.create({name: "Mjöl"});
  await models.Ingredient.create({name: "Olivolja"});
  await models.Ingredient.create({name: "Tofu"});
  await models.Ingredient.create({name: "Svarta bönor"});
  await models.Ingredient.create({name: "Socker"});
  await models.Ingredient.create({name: "Salt & Peppar"});
  await models.Ingredient.create({name: "Gurkmeja"});
  await models.Ingredient.create({name: "Paprika"});
  await models.Ingredient.create({name: "Gurka"});
  await models.Ingredient.create({name: "Potatis"});
  await models.Ingredient.create({name: "Jasminris"});
  await models.Ingredient.create({name: "Soja"});
  await models.Ingredient.create({name: "Kokosmjölk"});
  await models.Ingredient.create({name: "Ris"});
  await models.Ingredient.create({name: "Kanel"});
  await models.Ingredient.create({name: "Äpple"});
  await models.Ingredient.create({name: "Solrosfrön"});
  await models.Ingredient.create({name: "Dadlar"});
  await models.Ingredient.create({name: "Svartpeppar"});
  await models.Ingredient.create({name: "Paprikapulver"});
  await models.Ingredient.create({name: "Habanero"});
  await models.Ingredient.create({name: "Dödssås"});
  await models.Ingredient.create({name: "Chilipulver"});
  await models.Ingredient.create({name: "Lök"});
  await models.Ingredient.create({name: "Vitlök"});

  // recipes
  const recipes = [
    {
      "userId": 1,
      "title": "Fiskburgare",
      "timeToComplete": 200230023,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 2,14,13,18],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Pankoflingor"
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Bostongurka"
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 1
        }
      ]
    },
    {
      "userId": 5,
      "title": "Linssoppa",
      "timeToComplete": 123,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 1,2,9,8,15,10,7],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 5,
          "IngredientId": 4
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 4,
          "IngredientId": 3
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 1
        }
      ]
    },
    {
      "userId": 4,
      "title": "Pasta Bolognese",
      "timeToComplete": 300,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 2,17,16,12,5,6],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 6,
          "IngredientId": 10
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 7,
          "IngredientId": 18
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 8,
          "IngredientId": 19
        }
      ]
    },
    {
      "userId": 3,
      "title": "Pasta Pesto",
      "timeToComplete": 200230023,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 2,8,9,6,5,10,7,12],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 2,
          "IngredientId": 28
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 3,
          "IngredientId": 23
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 4,
          "IngredientId": 19
        }
      ]
    },
    {
      "userId": 2,
      "title": "Pasta la Dente",
      "timeToComplete": 12,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 2,12,7,8,9,10],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 16
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "pasta"
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 7
        }
      ]
    },
    {
      "userId": 1,
      "title": "Magnum Isglass",
      "timeToComplete": 200230023,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 3,4,5,6,8,9],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Pankoflingor"
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Bostongurka"
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 1
        }
      ]
    },
    {
      "userId": 1,
      "title": "Jamie Olivers Oliver",
      "timeToComplete": 200230023,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 1,4,5,6,7,8,9,10],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Oliver"
        }
      ]
    },
    {
      "userId": 1,
      "title": "Gordon Ramsay's Ramen",
      "timeToComplete": 200230023,
      "tweet": "A great recipe for the whole family",
      "steps": [
        {
          "instruction": "do the stuff",
          "number": 1
        },{
          "instruction": "do the other stuff",
          "number": 2
        },{
          "instruction": "do the last stuff",
          "number": 3
        }
      ],
      "tags": [ 2,12,15,7,8,9],
      "ingredients": [
        {
          "number": 1,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Pankoflingor"
        },{
          "number": 2,
          "amount": 2,
          "UnitId": 1,
          "ingredient": "Bostongurka"
        },{
          "number": 3,
          "amount": 2,
          "UnitId": 1,
          "IngredientId": 1
        }
      ]
    }
  ];
  for(let i = 0; i < recipes.length; i++){
    await recipeController.create(recipes[i], recipes[i].userId);
  }

  await models.Likes.create({userId: 1, recipeId: 1});
  await models.Likes.create({userId: 1, recipeId: 2});
  await models.Likes.create({userId: 1, recipeId: 3});
  await models.Likes.create({userId: 1, recipeId: 4});
  await models.Likes.create({userId: 1, recipeId: 5});
  await models.Likes.create({userId: 2, recipeId: 1});
  await models.Likes.create({userId: 2, recipeId: 2});
  await models.Likes.create({userId: 2, recipeId: 3});
  await models.Likes.create({userId: 3, recipeId: 1});
  await models.Likes.create({userId: 3, recipeId: 7});
  await models.Likes.create({userId: 3, recipeId: 2});
  await models.Likes.create({userId: 3, recipeId: 3});
  await models.Likes.create({userId: 4, recipeId: 5});
  await models.Likes.create({userId: 4, recipeId: 3});
  await models.Likes.create({userId: 5, recipeId: 1});
  await models.Likes.create({userId: 5, recipeId: 3});

  await models.Favorites.create({userId: 1, recipeId: 1});
  await models.Favorites.create({userId: 1, recipeId: 2});
  await models.Favorites.create({userId: 1, recipeId: 3});
  await models.Favorites.create({userId: 1, recipeId: 4});
  await models.Favorites.create({userId: 1, recipeId: 5});
  await models.Favorites.create({userId: 2, recipeId: 1});
  await models.Favorites.create({userId: 2, recipeId: 2});
  await models.Favorites.create({userId: 2, recipeId: 3});
  await models.Favorites.create({userId: 3, recipeId: 1});
  await models.Favorites.create({userId: 3, recipeId: 7});
  await models.Favorites.create({userId: 4, recipeId: 5});
  await models.Favorites.create({userId: 5, recipeId: 1});


  return true;
};



