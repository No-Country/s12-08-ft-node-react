const Joi = require('joi');

const usersValidation = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    profile_picture: Joi.string().regex(/^data:image\/\w+;base64,/).allow(null).optional(),
    date_of_birth: Joi.date().required(),
 });

const editUserValidation = Joi.object({
    email: Joi.string().email().allow(null).optional(),
    name: Joi.string().allow(null).optional(),
    password: Joi.string().allow(null).optional(),
    profile_picture: Joi.string().regex(/^data:image\/\w+;base64,/).allow(null).optional(),
    date_of_birth: Joi.date().allow(null).optional(),
})

const loginValidation = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {usersValidation, loginValidation, editUserValidation}