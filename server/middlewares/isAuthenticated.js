const passport = require("passport");
const cfg = require("../config/jwtConfig");
// check if the user is authenticated
const isAuthenticated = (req, res, next)=> {
    passport.authenticate("jwt", cfg.jwtSession, (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          code: 401,
          message: 'Unathoraized user'
        });
      }
      req.user = user;
      next();
    })(req, res, next);
}

module.exports = isAuthenticated;
