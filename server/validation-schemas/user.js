exports.update = {
  firstName: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ]+[a-zåäöA-ZÅÄÖ\s]+$/,
      errorMessage: "must only contain letters"
    }
  },
  lastName: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ]+[a-zåäöA-ZÅÄÖ\s]+$/,
      errorMessage: "must only contain letters"
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
