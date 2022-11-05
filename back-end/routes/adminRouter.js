const express = require("express");
const passport = require("passport");
const DownloadEvent = require("../mongoModels/DownloadEvent");

function createAdminRouter() {
  const adminRouter = express.Router();

  adminRouter.get("/downloadHistory", passport.authenticate("jwt", { session: false }), (_, res) => {
    DownloadEvent.find(null, (err, events) => {
      if (err) {
        return res.send(err);
      }

      return res.json(events);
    }).limit(1000);
  });

  return adminRouter;
}

module.exports = createAdminRouter;
