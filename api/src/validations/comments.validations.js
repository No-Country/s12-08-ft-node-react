const Joi = require('joi');

const createCommentValidation = Joi.object({ 
    suscriber_id: Joi.string().required(),
    content: Joi.string().valid("image", "video", "text", "gif").required(),
    text: Joi.string().allow(null).optional(),
    image: Joi.string().allow(null).when('content', { is: 'image', then: Joi.required() }),
    video: Joi.string().allow(null).when('content', { is: 'video', then: Joi.required() }),
    gif: Joi.string().allow(null).when('content', { is: 'gif', then: Joi.required() }),
}).xor('image', 'video', 'gif');

module.exports = { createCommentValidation }