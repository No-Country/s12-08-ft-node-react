const Joi = require('joi');

const createSubscriptionStripeValidation = Joi.object({
    suscriber_id: Joi.string().required(),
    chat_id: Joi.string().required(),
 });

const cancelSubscriptionStripeValidation = Joi.object({
    chat_id: Joi.string().required()
})

module.exports = {createSubscriptionStripeValidation, cancelSubscriptionStripeValidation} 