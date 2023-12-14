const jwt = require("jsonwebtoken");
const BadRequest = require("../../errorClasses/BadRequest");
const NotFound = require("../../errorClasses/NotFound");
const { User, Subscription } = require("../../db");
const Unauthorized = require("../../errorClasses/Unauthorized");
const stripe = require("../../stripe");
require("dotenv").config();

const checkSubscription = async (req, res, next) => {
  try {
    if (req.user_id == req.params.id) {
      next();
      return
    }
    const subscription = await Subscription.findOne({
      where: { user_id: req.user_id, beneficiary_id: req.params.id },
    });

    if (!subscription) {
      throw new Unauthorized("User never subscribed to this chat");
    }
    if (new Date().getTime() > new Date(subscription.end_date).getTime() || !subscription.status) {
      //stripe
      const subscriptions = await stripe.subscriptions.search({
        query: `metadata[\"user_id\"]:\"${req.user_id}\" AND metadata[\"chat_id\"]:\"${req.params.id}\"`,
      });
      if (subscriptions.data[0].status === "active") {
        subscription.status = true
        await subscription.save()
      } else {
        subscription.status = false
        await subscription.save()
        throw new Unauthorized("User is not subscribed to this chat");
      }
      
      
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkSubscription };
