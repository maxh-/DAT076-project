exports.update = {
  firstName: {
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
  lastName: {
      in: ['body'],
    exists: {
      options: true,
      errorMessage: "missing from body"
    },
    matches: {
      options: /^[a-zåäöA-ZÅÄÖ\s]*$/,
      errorMessage: "must only contain letters"
    }
  }
}
