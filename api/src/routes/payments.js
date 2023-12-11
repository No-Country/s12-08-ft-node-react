const express = require("express");
const paymentsRouter = express.Router();
const { PaymentController } = require("../controllers/payments.paypal.controller");
const { checkSession } = require("../middlewares/session/session");

paymentsRouter.use(checkSession)

paymentsRouter.post("/createorder", PaymentController.createOrder);

module.exports = paymentsRouter;
