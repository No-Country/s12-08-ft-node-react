const express = require("express");
const usersRouter = express.Router();
const { UserController } = require("../controllers/users.controller");

usersRouter.post("/sign-up", UserController);

module.exports = usersRouter;
