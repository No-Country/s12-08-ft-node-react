const Chat = require("../database/mongo/chats.model.js");
const Messages = require("../database/mongo/messages.model.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const NotFound = require("../errorClasses/NotFound.js");
const Unauthorized = require("../errorClasses/Unauthorized.js");
const {
  createMessageValidation, deleteMessageValidation,editMessageValidation
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

      const { user_id , text, image, video, gif, content } = value;

      const message = await Messages.create({
        user_id,
        content,
        text,
        image,
        video,
        gif,
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

  static async editMessage(req, res, next){
    try {
      const user_id = req.user_id
      const message_id = req.params.id

      if(!message_id){
        throw new BadRequest("El id del mensaje es necesario")
      }

      const { error, value } = editMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const chat = await Chat.findById( user_id )

      const messageExist = chat.messages.includes( message_id )

      if(!messageExist){
        throw new NotFound("El mensaje no existe en el chat")
      }

      const { text, content } = value;

      if(content !== 'text'){
        const valueCont = value[content]
        const uploadResponse = await cloudinary.uploader.upload(valueCont, {
          resource_type: "auto",
          folder: "pov",
        });

        value[content] = uploadResponse.secure_url;
      }

      const newMessage = await Messages.findByIdAndUpdate(message_id ,{
        content,
        text,
        image: value.image,
        video: value.video,
        gif: value.gif,
      }, {new: true})


    res.status(201).json({ message: "Mensaje editado exitosamente", newMessage: newMessage });
    } catch (error) {
      next(error);
    }
  }
  
  static async delete(req, res, next) {
    req.body.user_id = req.user_id
    try {
      const { error, value } = deleteMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { user_id , chat_id, message_id } = value;

      if (user_id === chat_id) {
        const message = await Messages.findByIdAndDelete({_id:message_id});
        const chat = await Chat.findById(user_id);
        chat.messages = chat.messages.flatMap((item) => {
          if (item.toString() === message_id) {
            return []
          }
          return item
        })
        chat.markModified("messages")
        chat.save()
        res
        .status(201)
        .json({ message: "Mensaje borrado exitosamente", deletedMessage: message });
      }else {
        throw new Unauthorized("No es el propietario del mensaje");
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { MessageController };
