const Joi = require('joi');

const createMessageValidation = Joi.object({ 
    user_id: Joi.string().required(),
    content: Joi.string().valid("image", "video", "text", "gif"),
    text: Joi.string().allow(null).optional(),
    image: Joi.string().allow(null).optional(),
    video: Joi.string().allow(null).optional(),
    gif: Joi.string().allow(null).optional(),
});

module.exports = {createMessageValidation} 