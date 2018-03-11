exports.register = {
  email: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isEmail: {
      errorMessage: "must be a email"
    },
    isLength: {
      options: {min: 1, max: 127},
      errorMessage: "Cant be longer than 127 charactes and not empty"
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
  },
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
  },
  isLength: {
    options: {min: 1, max: 250},
    errorMessage: "Cant be longer than 250 charactes and not empty"
  }
};

exports.forgot = {
  email: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isEmail: {
      errorMessage: "must be a email"
    },
    isLength: {
      options: {min: 1, max: 127},
      errorMessage: "Cant be longer than 127 charactes and not empty"
    }
  }
};

exports.login = {
  email: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isEmail: {
      errorMessage: "must be a email"
    },
    isLength: {
      options: {min: 1, max: 127},
      errorMessage: "Cant be longer than 127 charactes and not empty"
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
  }
};

exports.reset = {
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
