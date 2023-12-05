const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");

//commentsRouter.get("/", CommentController.example);

commentsRouter.put("/reaction/:commentId", CommentController.putReactionComm);

module.exports = commentsRouter;
