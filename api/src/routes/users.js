const express = require("express");
const usersRouter = express.Router();
const { UserController } = require("../controllers/users.controller");

usersRouter.get("/", UserController.example);

module.exports = usersRouter;
