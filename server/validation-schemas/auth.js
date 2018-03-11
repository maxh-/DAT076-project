exports.register = {
  email: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    isEmail: {
      errorMessage: "must be a email"
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
    }
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
