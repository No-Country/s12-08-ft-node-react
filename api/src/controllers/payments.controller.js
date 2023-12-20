const { Payment, User, Subscription } = require("../db.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const NotFound = require("../errorClasses/NotFound.js");
const stripe = require("../stripe.js");
const validations = require("../validations/payments.validations.js");
const { format, addMonths, fromUnixTime } = require('date-fns');

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
        success_url: `${process.env.DEPLOY_URL}/chats/${chat_id}?succes=true`,
        cancel_url:`${process.env.DEPLOY_URL}`,
      });
      return res
        .status(201)
        .json({ message: "Checkout session", session });

    } catch (err) {
      next(err);
    }
  }

  static async cancelSubscriptionStripe(req, res, next) {
    try {
      const user_id = req.user_id;
      req.body.chat_id = req.params.chat_id

      const { error, value } = validations.cancelSubscriptionStripeValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { chat_id } = value;

      const customers = await stripe.customers.search({
        query: `metadata[\'user_id\']:\'${user_id}\'`,
      });

      if(customers.data.length == 0){
        throw new NotFound('Customer not found')
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id
      })

      if( subscriptions.data.length == 0){
        throw new NotFound('No se encontraron suscripciones')
      }

      const subscription = subscriptions.data.find(sub => sub.metadata.user_id == user_id && sub.metadata.chat_id == chat_id)

      if(!subscription){
        throw new NotFound('No se encontro la suscripción')
      }

      const sub_cancel = await stripe.subscriptions.update(
        subscription.id,
        {
          cancel_at_period_end: true,
        }
      );

      const date_cancel = format(fromUnixTime(sub_cancel.cancel_at), 'dd-MM-yyyy');
      return res.status(200).json({ message: `Se canceló correctamente la suscripción - disponible hasta ${date_cancel}`, subscription: sub_cancel });
    } catch (error) {
      next(error);
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
          const invoice = paymentIntent.invoice_pdf
          
          const start_date = format(new Date(), 'yyyy-MM-dd')
          const end_date = format(addMonths(new Date(), 1), 'yyyy-MM-dd')

          const subscription_exist = await Subscription.findOne({where: {user_id: userId, beneficiary_id: chatId}})

          let subscription
          if(subscription_exist){
            subscription = await subscription_exist.update({end_date, status: true})
          }else{
            subscription = await Subscription.create({user_id: userId, beneficiary_id: chatId, start_date, end_date, status: true})
          }

          await Payment.create({amount: paymentIntent.total / 100, pay_date: start_date, method: 'stripe', status: 'ok', subscription_id: subscription.id, invoice})

          if(!subscription){
            throw new Error('Error creando la suscripción');
          }
          break;
      }
      // Return a response to acknowledge receipt of the event
      return res.json({received: true});
    } catch (err) {
      next(err);
  }
  }
}

module.exports = { PaymentController };
