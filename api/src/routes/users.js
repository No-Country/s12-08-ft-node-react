const express = require("express");
const usersRouter = express.Router();
const {checkSession} = require('../middlewares/session/session')
const { UserController } = require("../controllers/users.controller");

usersRouter.use(checkSession)
usersRouter.put("/edit/:id" , UserController.editUser)

module.exports = usersRouter