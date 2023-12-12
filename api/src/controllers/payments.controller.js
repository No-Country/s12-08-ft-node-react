const { Payment, User } = require("../db.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const stripe = require("../stripe.js");
const validations = require("../validations/payments.validations.js");

class PaymentController {
  static async createSubscriptionStripe(req, res, next) {
    try {
      req.body.suscriber_id = req.user_id;
      req.body.chat_id = req.params.id;

      const { error, value } = validations.createSubscriptionStripeValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { suscriber_id, chat_id } = value;
      // call db methods after validations have passed

      const customer = await stripe.customers.search({
        query: `metadata[\"user_id\"]:\"${suscriber_id}\"`,
      });
      const price = await stripe.prices.search({
        query: `metadata[\"user_id\"]:\"${chat_id}\"`,

      });
      if(customer.data.length === 0){
        const user = await User.findOne({
          where: { id: suscriber_id },
          attributes: { exclude: ['password'] } 
        });
        
        const newCustomer = await stripe.customers.create({
          name: user.username,
          email: user.email,
          metadata:{
            user_id:user.id
          }
        });
        customer.data.push(newCustomer)
      }
      if (price.data.length === 0 ) {
        const user = await User.findByPk(chat_id);
        if (!user) {
          throw new BadRequest("El usuario no existe");
        }
        const plan = await stripe.prices.create({
          currency: 'usd',
          unit_amount: 500,
          recurring: {
            interval: 'month',
          },
          product_data: {
            name: "Suscription to " + user.username,
            metadata:{
              user_id:user.id
            }
          },
          metadata:{
            user_id:user.id
          }
        });

        price.data.push(plan)
      }
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price: price.data[0].id,
          quantity: 1,
        }],
        customer: customer.data[0].id,
        mode: 'subscription',
        success_url: `${process.env.DEPLOY_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.DEPLOY_URL}/cancel`,
      });
      res
        .status(201)
        .json({ message: "Checkout session", session });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = { PaymentController };
