exports.create = {
  title: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ\s]*$/,
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
      options: /^[a-zåäöA-ZÅÄÖ\s]*$/,
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
  'steps.*.instruction': {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "Steps must have an instruction"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ\s]*$/,
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
    optional: false,
    isInt: true,
    errorMessage: "must be an integer"
  }
  ,
  ingredients: {
      in: ['body'],
    exists: true,
    errorMessage: "Must be in body"
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

