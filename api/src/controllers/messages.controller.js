const Chat = require("../database/mongo/chats.model.js");
const Messages = require("../database/mongo/messages.model.js");
const BadRequest = require("../errorClasses/BadRequest.js");
const NotFound = require("../errorClasses/NotFound.js");
const Unauthorized = require("../errorClasses/Unauthorized.js");
const {
  createMessageValidation,
  deleteMessageValidation,
  editMessageValidation,
} = require("../validations/messages.validations.js");
const { cloudinary } = require("../config/cloudinary/index.js");
const { getIO } = require("../socket.js");

class MessageController {
  static async getByChat(req, res, next){
    try{
      const pageSize = 20;

      const id = req.params.id;
      const page = req.query.page || 1;
      const skip = (page - 1) * pageSize;

      if (!id) {
        throw new BadRequest("El id es necesario");
      }

      const messages = await Messages.find({ user_id: id}).skip(skip).limit(pageSize).sort({ createdAt: -1 });

      await Messages.populate(messages, {
        path: "comments",
        options: {
          limit: 1,
        },
      });

      return res.status(200).json({
        messages: messages
      });
    }catch(error){
      next(error);
    }
  }
  static async create(req, res, next) {
    req.body.user_id = req.user_id;
    try {
      const { error, value } = createMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { user_id, text, content } = value;

      if (content !== "text") {
        const valueCont = value[content];
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

      const io = getIO();
      io.to(user_id).emit("new-message", message);

      res
        .status(201)
        .json({ message: "Mensaje creado exitosamente", newMessage: message });
      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }


  static async editMessage(req, res, next) {
    try {
      const user_id = req.user_id;
      const message_id = req.params.id;

      if (!message_id) {
        throw new BadRequest("El id del mensaje es necesario");
      }

      const { error, value } = editMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const chat = await Chat.findById(user_id);

      const messageExist = chat.messages.includes(message_id);

      if (!messageExist) {
        throw new NotFound("El mensaje no existe en el chat");
      }

      const { text, content } = value;

      if (content !== "text") {
        const valueCont = value[content];
        const uploadResponse = await cloudinary.uploader.upload(valueCont, {
          resource_type: "auto",
          folder: "pov",
        });

        value[content] = uploadResponse.secure_url;
      }

      const newMessage = await Messages.findByIdAndUpdate(
        message_id,
        {
          content,
          text,
          image: value.image,
          video: value.video,
          gif: value.gif,
        },
        { new: true }
      );

      res.status(201).json({
        message: "Mensaje editado exitosamente",
        newMessage: newMessage,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    req.body.user_id = req.user_id;
    req.body.message_id = req.params.id;

    try {
      const { error, value } = deleteMessageValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { user_id, chat_id, message_id } = value;

      if (user_id === chat_id) {
        const message = await Messages.findByIdAndDelete({ _id: message_id });
        const chat = await Chat.findById(user_id);
        chat.messages = chat.messages.flatMap((item) => {
          if (item.toString() === message_id) {
            return [];
          }
          return item;
        });
        chat.markModified("messages");
        chat.save();
        res.status(201).json({
          message: "Mensaje borrado exitosamente",
          deletedMessage: message,
        });
      } else {
        throw new Unauthorized("No es el propietario del mensaje");
      }
    } catch (err) {
      next(err);
    }
  }

  static async putReaction(req, res, next) {
    try {
      const { messageId } = req.params;
      const { user_id, reaction } = req.body;

      const message = await Messages.findById(messageId);

      if (!message) {
        throw new BadRequest("Mensaje no encontrado");
      }

      if (!message.reactions) {
        message.reactions = {
          users_who_reacted: [],
        };
      }

      const user_reaction = {
        user_id: user_id,
        reaction: reaction,
      };

      const isUserReaction = message.reactions.users_who_reacted.find(
        (user) => user.user_id === user_id
      );

      if (isUserReaction && isUserReaction.reaction === reaction) {
        // Si la reacción es la misma que la anterior, se elimina
        const indexToRemove = message.reactions.users_who_reacted.findIndex(
          (user) => user.user_id === user_id
        );
        message.reactions.users_who_reacted.splice(indexToRemove, 1);
        message.reactions[isUserReaction.reaction]--;
      } else if (isUserReaction && isUserReaction.reaction !== reaction) {
        // Si la reacción cambia, se elimina la anterior y se agrega la nueva
        const indexToRemove = message.reactions.users_who_reacted.findIndex(
          (user) => user.user_id === user_id
        );
        message.reactions.users_who_reacted.splice(indexToRemove, 1);
        message.reactions[isUserReaction.reaction]--;
        //Acá despues de eliminar la reación anterior, agrego la nueva!
        message.reactions.users_who_reacted.push(user_reaction);
        message.reactions[reaction] = (message.reactions[reaction] || 0) + 1;
      } else {
        // Si el usuario no reacciono nuca, se agrega la nueva reacción
        message.reactions.users_who_reacted.push(user_reaction);
        message.reactions[reaction] = (message.reactions[reaction] || 0) + 1;
      }

      await message.save();

      res.status(200).json({
        message: "Reacción actualizada exitosamente",
        updatedMessage: message,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { MessageController };

