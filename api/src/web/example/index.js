const express = require("express");
const exampleRouter = express.Router();
// const { ExampleService } = require("../../lib/users/");

exampleRouter.get("/", (req, res) => {
  console.log("Example");
});

module.exports = usersRouter;
