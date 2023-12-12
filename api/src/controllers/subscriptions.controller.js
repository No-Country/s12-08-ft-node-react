const { Subscription } = require('../db.js');
const validations = require('../validations/subscriptions.validations.js');

class SubscriptionController {
  static async infoSubs(req,res,next) {
    try {
      const userId = req.params.id;
      const userSubscriptions = await Subscription.findAll({
        where: { user_id: userId },
      });
      res.status(200).json({ userSubscriptions});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { SubscriptionController };