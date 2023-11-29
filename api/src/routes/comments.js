const express = require("express");
const commentsRouter = express.Router();
const { CommentController } = require("../controllers/comments.controller");

commentsRouter.get("/", CommentController.example);

module.exports = commentsRouter;
