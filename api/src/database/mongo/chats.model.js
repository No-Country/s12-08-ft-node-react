const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    _id: { type: String, required: true },
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    messages:[{ type: Schema.Types.ObjectId, ref: 'Messages' }],
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dkgvoukdj/image/upload/v1702563489/pov/tz5be23mk3xbq3osahkh.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;



