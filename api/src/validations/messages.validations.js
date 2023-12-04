const Joi = require('joi');

const createMessageValidation = Joi.object({ 
    user_id: Joi.string().required(),
    content: Joi.string().valid("image", "video", "text", "gif"),
    text: Joi.string().allow(null).optional(),
    image: Joi.string().allow(null).optional(),
    video: Joi.string().allow(null).optional(),
    gif: Joi.string().allow(null).optional(),
});

const deleteMessageValidation = Joi.object({ 
    user_id: Joi.string().required(),
    chat_id: Joi.string().required(),
    message_id: Joi.string().required(),
});

module.exports = {createMessageValidation, deleteMessageValidation} 