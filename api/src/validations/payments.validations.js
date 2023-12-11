const Joi = require('joi');

const createOrderValidation = Joi.object({
    email: Joi.string().email().allow(null),
    name: Joi.string().allow(null)
});

module.exports = {createOrderValidation} 