const express = require("express");
const passport = require("passport");

function createAdminRouter() {
  const adminRouter = express.Router();

  adminRouter.get("/manage", passport.authenticate("jwt", { session: false }), (_, res) => {
    return res.send({ test: true });
  });

  return adminRouter;
}

module.exports = createAdminRouter;
