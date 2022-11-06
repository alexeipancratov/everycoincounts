const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const usersService = require("../modules/usersService");

function createUsersRouter() {
  const usersRouter = express.Router();

  usersRouter.post("/register", (req, res) => {
    usersService
      .createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then((_) => res.sendStatus(201))
      .catch((err) => res.json(err));
  });

  usersRouter.post("/authenticate", (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).json({ message: "Something went wrong.", error: err });
      }

      if (!user) {
        return res.status(400).json(info);
      }

      return res.status(200).json({
        token: jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" }),
        username: user.username,
      });
    })(req, res);
  });

  return usersRouter;
}

module.exports = createUsersRouter;
