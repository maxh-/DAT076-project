// check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
    next();
  } else {
    res.status(401).json({
      success: false,
      code: 401,
      message: "user not logged in"
    });
  }
};

module.exports = isAuthenticated;
