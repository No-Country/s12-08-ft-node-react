const Joi = require('joi');

const editValidation = Joi.object({
    name: Joi.string().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    img: Joi.string().regex(/^data:image\/\w+;base64,/).allow(null).optional()
})

module.exports = {editValidation}