const Stripe = require('stripe');
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SK);
module.exports = stripe