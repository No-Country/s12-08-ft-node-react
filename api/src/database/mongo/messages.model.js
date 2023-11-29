const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    user_id: { type: String, required: true },
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
    reactions: { type: [{ user_id: String, type: String }], default: []},
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
