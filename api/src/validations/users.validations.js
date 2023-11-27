const Joi = require('joi');

const usersValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('client', 'admin').required(),
    profile_picture: Joi.string().allow(null).optional(),
    date_of_birth: Joi.date().required(),
 });

module.exports = usersValidation 