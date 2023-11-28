const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: {
      type: String,
      default:
        "https://www.adobe.com/es/express/discover/sizes/media_12fa8cb62228835a68a2d107675896c3aa41fb5e4.png?width=750&format=png&optimize=medium",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
