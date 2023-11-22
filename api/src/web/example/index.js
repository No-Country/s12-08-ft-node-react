const express = require("express");
const exampleRouter = express.Router();
const { ExampleService } = require("../../lib/examples/");

exampleRouter.get("/", ExampleService.example);

module.exports = usersRouter;
