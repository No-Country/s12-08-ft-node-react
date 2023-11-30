const express = require("express");
const chatsRouter = express.Router();
const { ChatController } = require("../controllers/chats.controller");

chatsRouter.get("/", ChatController.example);

module.exports = chatsRouter;
