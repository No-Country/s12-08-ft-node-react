const Chat = require('../database/mongo/chats.model.js');
const {editValidation} = require('../validations/chats.validations.js');
const { cloudinary } = require("../config/cloudinary/index.js");

class ChatController {

  static async editChat(req, res, next) {
    try {
      const user_id = req.user_id

      const { error, value } = editValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      if(value.img){
        const uploadResponse = await cloudinary.uploader.upload(value.img, {
          resource_type: "auto",
          folder: "pov",
        });

        value.img = uploadResponse.secure_url;
      }

      const newChat = await Chat.findByIdAndUpdate(user_id ,{
        ...value
      }, {new: true})

      res.status(201).json({ message: "Chat editado exitosamente", newChat: newChat });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { ChatController };