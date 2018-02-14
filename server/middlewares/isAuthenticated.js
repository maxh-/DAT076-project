// check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.user){
    next();
  } else {
    res.status(401).send("you are not logged in");
  }
};

module.exports = isAuthenticated;
