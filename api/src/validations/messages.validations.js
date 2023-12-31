const Joi = require("joi");

const createMessageValidation = Joi.object({
  user_id: Joi.string().required(),
  content: Joi.string().valid("image", "video", "text", "gif").required(),
  text: Joi.string()
    .allow(null)
    .when("content", { is: "text", then: Joi.required() }),
  image: Joi.string()
    .allow(null)
    .when("content", { is: "image", then: Joi.required() }),
  video: Joi.string()
    .allow(null)
    .when("content", { is: "video", then: Joi.required() }),
  gif: Joi.string()
    .allow(null)
    .when("content", { is: "gif", then: Joi.required() }),
}).custom((value, helpers) => {
  const { content, image, video, gif } = value;
  console.log(image !== undefined);
  const mediaCount = [image, video, gif].filter(
    (media) => media !== null && media !== undefined
  ).length;

  if (content === "text") {
    if (mediaCount > 0) {
      return helpers.error("any.invalid");
    }
  } else {
    console.log(mediaCount);
    if (mediaCount !== 1) {
      return helpers.error("any.invalid");
    }
  }
  return value;
});

const editMessageValidation = Joi.object({
  content: Joi.string().valid("image", "video", "text", "gif").required(),
  text: Joi.string()
    .allow(null)
    .when("content", { is: "text", then: Joi.required() }),
  image: Joi.string()
    .allow(null)
    .when("content", { is: "image", then: Joi.required() }),
  video: Joi.string()
    .allow(null)
    .when("content", { is: "video", then: Joi.required() }),
  gif: Joi.string()
    .allow(null)
    .when("content", { is: "gif", then: Joi.required() }),
}).custom((value, helpers) => {
  const { content, image, video, gif } = value;
  console.log(image !== undefined);
  const mediaCount = [image, video, gif].filter(
    (media) => media !== null && media !== undefined
  ).length;

  if (content === "text") {
    if (mediaCount > 0) {
      return helpers.error("any.invalid");
    }
  } else {
    console.log(mediaCount);
    if (mediaCount !== 1) {
      return helpers.error("any.invalid");
    }
  }

  return value;
});

const deleteMessageValidation = Joi.object({
  user_id: Joi.string().required(),
  chat_id: Joi.string().required(),
  message_id: Joi.string().required(),
});

module.exports = { createMessageValidation, deleteMessageValidation };

