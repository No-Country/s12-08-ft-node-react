const express = require("express");
const chatsRouter = express.Router();
const { ChatController } = require("../controllers/chats.controller");
const { MessageController } = require("../controllers/messages.controller");
const { checkSession } = require("../middlewares/session/session");

chatsRouter.get("/", ChatController.example);

chatsRouter.post("/chat", checkSession, MessageController.create);

module.exports = chatsRouter;
