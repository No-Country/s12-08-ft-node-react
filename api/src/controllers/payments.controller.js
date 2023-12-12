const { Payment, User, Subscription } = require("../db.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const stripe = require("../stripe.js");
const validations = require("../validations/payments.validations.js");
const { format, addMonths } = require('date-fns');

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
        subscription_data: {
          metadata: {
            user_id: suscriber_id,
            chat_id: chat_id,
          },
        },
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

  static async captureOrder(req, res, next){
    
    try{
      const event = req.body;

      // Handle the event
      switch (event.type) {
        case 'invoice.payment_succeeded':
          const paymentIntent = event.data.object;
          // Then define and call a method to handle the successful payment intent.
          const userId = paymentIntent.subscription_details.metadata.user_id;
          const chatId = paymentIntent.subscription_details.metadata.chat_id;
          
          const start_date = format(new Date(), 'yyyy-MM-dd')
          const end_date = format(addMonths(new Date(), 1), 'yyyy-MM-dd')

          const payment = await Payment.create({amount: paymentIntent.total / 100, pay_date: start_date, method: 'stripe', status: 'ok'})
          const subscription = await Subscription.create({payment_id: payment.id, user_id: userId, beneficiary_id: chatId, start_date, end_date, status: true})

          if(!subscription){
            throw new Error('Error creando la suscripción');
          }

          break;
      }
      // Return a response to acknowledge receipt of the event
      res.json({received: true});
    } catch (err) {
      next(err);
  }
  }
}

module.exports = { PaymentController };
