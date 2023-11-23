const express = require("express");
const examplesRouter = express.Router();
const { ExampleController } = require("../controllers/examples.controller");

examplesRouter.get("/", ExampleController.example);

module.exports = examplesRouter;
