const express = require("express");
const paymentsRouter = express.Router();
const { PaymentController } = require("../controllers/payments.controller");
const { checkSession } = require("../middlewares/session/session");

paymentsRouter.post("/subscribe/:id",checkSession, PaymentController.createSubscriptionStripe);

module.exports = paymentsRouter;
