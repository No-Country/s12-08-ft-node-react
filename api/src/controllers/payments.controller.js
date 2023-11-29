const { Payment } = require('../db.js');
const validations = require('../validations/payments.validations.js');

class PaymentController {
  static async example(req,res,next) {
    console.log('example!');
    try {
      await validations.validateAsync(req.body);

      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { PaymentController };