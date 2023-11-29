const express = require("express");
const messagesRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");

messagesRouter.get("/", MessageController.example);

module.exports = messagesRouter;
