const Chat = require("../database/mongo/chats.model.js");
const Messages = require("../database/mongo/messages.model.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const {
  createMessageValidation,
} = require("../validations/messages.validations.js");
const { cloudinary } = require("../config/cloudinary/index.js");

class MessageController {
  static async create(req, res, next) {
    
    req.body.user_id = req.user_id
    try {
      const { error, value } = createMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { user_id , text, content } = value;

      if(content !== 'text'){
        const valueCont = value[content]
        const uploadResponse = await cloudinary.uploader.upload(valueCont, {
          resource_type: "auto",
          folder: "pov",
        });
      
        value[content] = uploadResponse.secure_url;
      }

      const message = await Messages.create({
        user_id,
        content,
        text,
        image: value.image,
        video: value.video,
        gif: value.gif,
      });

      const chat = await Chat.findById(user_id);
      chat.messages.push(message._id);
      chat.save();

      res
        .status(201)
        .json({ message: "Mensaje creado exitosamente", newMessage: message });
      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { MessageController };
