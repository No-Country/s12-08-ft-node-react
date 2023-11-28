const { Subscription } = require('../database/sql/subscriptions.model.js');
const validations = require('../validations/subscriptions.validations.js');

class SubscriptionController {
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

module.exports = { SubscriptionController };