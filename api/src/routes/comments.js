const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");
const { checkSession } = require("../middlewares/session/session");

commentsRouter.use(checkSession)

commentsRouter.delete("/", commentsRouter.delete);
commentsRouter.put("/reaction/:commentId", CommentController.putReactionComm);

module.exports = commentsRouter;
