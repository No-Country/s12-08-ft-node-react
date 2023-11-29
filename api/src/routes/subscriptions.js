const express = require("express");
const subscriptionsRouter = express.Router();
const { SubscriptionController } = require("../controllers/subscriptions.controller");

subscriptionsRouter.get("/", SubscriptionController.example);

module.exports = subscriptionsRouter;
