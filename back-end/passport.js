const passport = require("passport");
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./mongoModels/User");

const localAuthStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  (username, password, done) => {
    return User.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Invalid username." });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid password." });
        }

        return done(null, user, { message: "Logged in successfully" });
      })
      .catch((err) => done(err));
  }
);

passport.use(localAuthStrategy);

const validateJwtStrategy = new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (_, done) => {
    return done(null, {});
  }
);

passport.use(validateJwtStrategy);
