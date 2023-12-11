const Chat = require('../database/mongo/chats.model.js');
const { User } = require('../db.js');
const {editValidation} = require('../validations/chats.validations.js');
const { cloudinary } = require("../config/cloudinary/index.js");
const NotFound = require('../errorClasses/NotFound.js');
const BadRequest = require('../errorClasses/BadRequest.js');

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

      return res.status(201).json({ message: "Chat editado exitosamente", newChat: newChat });
    } catch (error) {
      next(error);
    }
  }

  static async getChatWithMessages(req, res, next){
    try {
      const pageSize = 20

      const id = req.params.id
      const page = req.query.page || 1
      const skip = (page - 1) * pageSize

      if(!id){
        throw new BadRequest('El id es necesario')
      }

      const user = await User.findByPk( id , {attributes: ['id', 'name', 'username', 'profile_picture']})

      if(!user){
        throw new NotFound('El usuario no existe')
      }

      const chat = await Chat.findById(id).populate({path: 'messages', options: {
        skip,
        limit: pageSize,
      },populate: { path: 'comments' }})

      if(!chat){
        throw new NotFound('No se encontro el chat')
      }

      return res.status(200).json({ user: user , chat: chat });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { ChatController };