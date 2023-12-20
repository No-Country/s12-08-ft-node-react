const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema(
  {
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
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
    reactions: {
      love: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      fun: { type: Number, default: 0 },
      interesting: { type: Number, default: 0 },
      users_who_reacted: [
        {
          user_id: { type: String },
          reaction: {
            type: String,
            enum: ["love", "sad", "fun", "interesting"],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index del campo createdAt
messagesSchema.index({ createdAt: -1 });

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
