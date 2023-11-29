const express = require("express");
const paymentsRouter = express.Router();
const { PaymentController } = require("../controllers/payments.controller");

paymentsRouter.get("/", PaymentController.example);

module.exports = paymentsRouter;
