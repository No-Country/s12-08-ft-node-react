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
    user_photo: {
      type: String,
    },
    username: {
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
          reaction: { type: String, enum: ['love', 'sad', 'fun', 'interesting'] },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

commentsSchema.index({ createdAt: -1 });

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
