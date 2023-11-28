const Joi = require('joi');

const usersValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    profile_picture: Joi.string().allow(null).optional(),
    date_of_birth: Joi.date().required(),
 });

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = {usersValidation, loginValidation}