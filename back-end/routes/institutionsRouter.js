const express = require("express");
const passport = require("passport");
const Institution = require("../mongoModels/Institution");

function createInstitutionsRouter() {
  const institutionsRouter = express.Router();

  institutionsRouter.get("/", (_, res) => {
    Institution.find({}, (err, institutions) => {
      const result = [];

      institutions.forEach((inst) => result.push(inst));

      res.send(result);
    });
  });

  institutionsRouter.get("/:username", (req, res) => {
    Institution.findOne({ username: { $eq: req.params.username } }, (err, inst) => {
      res.send(inst);
    });
  });

  return institutionsRouter;
}

module.exports = createInstitutionsRouter;
