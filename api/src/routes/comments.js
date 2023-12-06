const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");
const { checkSession } = require("../middlewares/session/session");

commentsRouter.use(checkSession)

commentsRouter.delete("/:id", CommentController.delete);
commentsRouter.put("/:id", CommentController.editComment);
commentsRouter.put("/reaction/:commentId", CommentController.putReactionComm);

module.exports = commentsRouter;
