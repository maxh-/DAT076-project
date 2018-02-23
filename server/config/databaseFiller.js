const models = require('../models');

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

  return true;
};
