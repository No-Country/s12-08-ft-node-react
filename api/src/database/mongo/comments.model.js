const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    message_id: { type: String, required: true },
    suscriber_id: { type: String, required: true },
    content: { type: String, required: true },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    gif: {
      type: String,
    },
    reaction: { type: [{ user_id: String, type: String }]},
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
