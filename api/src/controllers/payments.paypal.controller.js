const BadRequest = require("../errorClasses/BadRequest.js");
const validations = require("../validations/payments.validations.js");
var fetch = require("node-fetch");
class PaymentController {
  static async createOrder(req, res, next) {
    try {
      const { error, value } = validations.createOrderValidation.validate(
        req.body
      );
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { email, name } = value;
      // Create a Date object from the input string
      const today = new Date();
      today.setTime(today.getTime() + 1 * 60 * 60 * 1000);
      // Extract individual date components
      const year = today.getUTCFullYear();
      const month = String(today.getUTCMonth() + 1).padStart(2, "0");
      const day = String(today.getUTCDate()).padStart(2, "0");
      const hours = String(today.getUTCHours()).padStart(2, "0");
      const minutes = String(today.getUTCMinutes()).padStart(2, "0");
      const seconds = String(today.getUTCSeconds()).padStart(2, "0");

      // Create the desired output date string
      const outputDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.PAYPAL_CLIENT + ":" + process.env.PAYPAL_SECRET
              ).toString("base64"),
            "Content-Type": "application/json",
            Accept: "application/json",
            "PayPal-Request-Id": "SUBSCRIPTION-21092019-001",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            plan_id: "P-1K945237LA7042933MV3S3ZA",
            start_time:outputDateString,
            quantity: "1",
            subscriber: {
              name: { given_name: name },
              email_address: email,
            },
            SOLUTIONTYPE:"Sole",
            application_context: {
              brand_name: "POV",
              locale: "en-US",
              user_action: "SUBSCRIBE_NOW",
              payment_method: {
                payer_selected: "PAYPAL",
                payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
              },
              return_url: `${process.env.DEPLOY_URL}/returnUrl`,
              cancel_url: `${process.env.DEPLOY_URL}/cancelUrl`,
            },
          }),
        }
      );
      const jsonRes = await response.text();
      // call db methods after validations have passed
      const body = JSON.parse(jsonRes);
      if(body.name ==="INVALID_REQUEST"){
        throw new BadRequest(body.details);
      }
      res
        .status(201)
        .json({ message: "Order creado exitosamente", order: body });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { PaymentController };
