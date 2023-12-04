const express = require("express");
const messagesRouter = express.Router();
const { MessageController } = require("../controllers/messages.controller");
const { checkSession } = require("../middlewares/session/session");

messagesRouter.delete("/",checkSession, MessageController.delete);

messagesRouter.put("/reaction", MessageController.putReaction);

module.exports = messagesRouter;
