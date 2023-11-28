const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    chat_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    user_id: { type: String, required: true },
    content: { type: ["image", "video", "text", "gif"], required: true },
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

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
