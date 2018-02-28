const passport = require("passport");
const passportJWT = require("passport-jwt");
const models = require("../../models");
const cfg = require("../../config/jwtConfig");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    const user = await models.User.findById(payload.id);
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });

  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    }
  };
};

