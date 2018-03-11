exports.update = {
  firstName: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ\-]+$/,
      errorMessage: "must only contain letters"
    },
    isLength: {
      options: {min: 1, max: 250},
      errorMessage: "Cant be longer than 250 charactes and not empty"
    }
  },
  lastName: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ]+[a-zåäöA-ZÅÄÖ\s\-]*$/,
      errorMessage: "must only contain letters"
    },
    isLength: {
      options: {min: 1, max: 250},
      errorMessage: "Cant be longer than 250 charactes and not empty"
    }
  }
};

exports.changePassword = {
  oldPassword: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isLength: {
      options: {min: 3},
      errorMessage: "must be atleast 3 characters long"
    },
    isLength: {
      options: {min: 1, max: 250},
      errorMessage: "Cant be longer than 250 charactes and not empty"
    }
  },
  password: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isLength: {
      options: {min: 3},
      errorMessage: "must be atleast 3 characters long"
    },
    isLength: {
      options: {min: 1, max: 250},
      errorMessage: "Cant be longer than 250 charactes and not empty"
    }
  },
  password2:{
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isLength: {
      options: {min: 3},
      errorMessage: "must be atleast 3 characters long"
    }
  }
};

exports.favorite = {
  recipeId: {
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
}
