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

  static async putReaction(req, res, next){
    try {
      const { messageId } = req.params;
      const { user_id, reaction } = req.body;

      const message = await Messages.findById(messageId);

      const userReactionIndex = message.users_who_reacted.findIndex(
        react => react.user_id === user_id
      );

      if (reaction && reaction !== '') {
        if (userReactionIndex !== -1) {
          // El usuario ya ha reaccionado al mensaje
          const previousReaction = message.users_who_reacted[userReactionIndex].reaction;
          if (previousReaction === reaction) {
            // El usuario toca la misma reacción, por lo tanto, elimina la reacción
            message.reactions[previousReaction] -= 1; // Decrementar el contador de la reacción
            message.users_who_reacted.splice(userReactionIndex, 1); // Eliminar la reacción del usuario
          } else {
            // Cambiar la reacción del usuario
            message.reactions[previousReaction] -= 1; // Decrementar el contador de la reacción anterior
            message.reactions[reaction] = (message.reactions[reaction] || 0) + 1; // Incrementar el contador de la nueva reacción
            message.users_who_reacted[userReactionIndex].reaction = reaction; // Actualizar la reacción del usuario
          }
        } else {
          // Agregar una nueva reacción del usuario
          message.reactions[reaction] = (message.reactions[reaction] || 0) + 1; // Incrementar el contador de la nueva reacción
          message.users_who_reacted.push({ user_id, reaction }); // Agregar la nueva reacción del usuario
        }
      } else {
        // Eliminar la reacción del usuario si la reacción no está presente o es vacía
        if (userReactionIndex !== -1) {
          const previousReaction = message.users_who_reacted[userReactionIndex].reaction;
          message.reactions[previousReaction] -= 1; // Decrementar el contador de la reacción anterior
          message.users_who_reacted.splice(userReactionIndex, 1); // Eliminar la reacción del usuario
        } else {
          return res.status(400).json({ message: 'No se puede eliminar la reacción.' });
        }
      }

      await message.save();

      res.status(200).json({ message: 'Reacción actualizada exitosamente', updatedMessage: message });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { MessageController };
