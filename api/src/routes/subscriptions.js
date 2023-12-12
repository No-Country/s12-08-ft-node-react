const express = require("express");
const subscriptionsRouter = express.Router();
const { SubscriptionController } = require("../controllers/subscriptions.controller");

subscriptionsRouter.get("/info/:id", SubscriptionController.infoSubs);

module.exports = subscriptionsRouter;
