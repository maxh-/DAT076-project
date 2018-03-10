exports.create = {
  title: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  tweet: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  timeToComplete: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isInt: {
      options: true,
      errorMessage: "must be an integer"
    }
  },
  steps: {
      in: ['body'],
    exists: true,
    errorMessage: "missing from body"
  },
  'steps.0': {
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one step"
  },
  'steps.*.instruction': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "Steps must have an instruction"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  'steps.*.number': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "Steps must have a number"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  tags: {
      in: ['body'],
    exists: true,
    errorMessage: "Must be in body"
  },
  'tags.*':{
      in: ['body'],
    isInt: true,
    errorMessage: "must be an integer"
  },
  'tags.0':{
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one tag"
  },
  ingredients: {
      in: ['body'],
    exists: true,
    errorMessage: "Must be in body"
  },
  'ingredients.0': {
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one ingredient"
  },
  'ingredients.*.number': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have a number"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  'ingredients.*.amount': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have an amount"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  'ingredients.*.UnitId': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have a unit"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  }
};

exports.update = {
  title: {
      in: ['body'],
    optional: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  tweet: {
      in: ['body'],
    optional: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  timeToComplete: {
      in: ['body'],
    optional: {
      options: true,
      errorMessage: "missing from body"
    },
    isInt: {
      options: true,
      errorMessage: "must be an integer"
    }
  },
  steps: {
      in: ['body'],
    exists: true,
    errorMessage: "missing from body"
  },
  'steps.0': {
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one step"
  },
  'steps.*.instruction': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "Steps must have an instruction"
    },
    matches: {
      options: /^\S+[\S\s.,!?'"#]*$/,
      errorMessage: "must only contain letters"
    }
  },
  'steps.*.number': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "Steps must have a number"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  tags: {
      in: ['body'],
    exists: true,
    errorMessage: "Must be in body"
  },
  'tags.*':{
      in: ['body'],
    isInt: true,
    errorMessage: "must be an integer"
  },
  'tags.0':{
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one tag"
  },
  ingredients: {
      in: ['body'],
    exists: true,
    errorMessage: "Must be in body"
  },
  'ingredients.0': {
      in: ['body'],
    exists: true,
    errorMessage: "must have atleast one ingredient"
  },
  'ingredients.*.number': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have a number"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  'ingredients.*.amount': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have an amount"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  },
  'ingredients.*.UnitId': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "ingredients must have a unit"
    },
    isInt:{
      options: true,
      errorMessage: "Must be an integer"
    }
  }
};

