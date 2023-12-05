const Comments = require('../database/mongo/comments.model.js');
const Messages = require("../database/mongo/messages.model.js");
const {createCommentValidation} = require('../validations/comments.validations.js');
const { cloudinary } = require("../config/cloudinary/index.js");
const BadRequest = require("../errorClasses/BadRequest.js");

class CommentController {
  static async create(req, res, next) {  
    try {
      const message_id = req.params.id
      req.body.suscriber_id = req.user_id

      if(!message_id){
        throw new BadRequest('Se debe proporcionar un ID de mensaje');
      }

      const { error, value } = createCommentValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { suscriber_id , text, content } = value;

      if(content !== 'text'){
        const valueCont = value[content]
        const uploadResponse = await cloudinary.uploader.upload(valueCont, {
          resource_type: "auto",
          folder: "pov",
        });
      
        value[content] = uploadResponse.secure_url;
      }

      const comment = await Comments.create({
        message_id,
        suscriber_id,
        text,
        image: value.image,
        video: value.video,
        gif: value.gif,
        content
      })

      const message = await Messages.findById( message_id );
      message.comments.push(comment._id);
      await message.save();
      
      return res.status(201).json({ message: 'Comentario editado exitosamente' , comment: comment });
    } catch (error) {
      next(error);
    }
  }

  static async putReactionComm(req, res, next) {
    try {
      const { commentId } = req.params;
      const { user_id, reaction } = req.body;
  
      const comment = await Comments.findById(commentId);
  
      if (!comment) {
        throw new BadRequest('Comentario no encontrado');
      }
  
      if (!comment.reactions) {
        comment.reactions = {
          users_who_reacted: []
        };
      }
  
      const user_reaction = {
        "user_id": user_id,
        "reaction": reaction
      };
  
      const isUserReaction = comment.reactions.users_who_reacted.find(user => user.user_id === user_id);

      if (isUserReaction && isUserReaction.reaction === reaction) {
        // Si la reacción es la misma que la anterior, se elimina
        const indexToRemove = comment.reactions.users_who_reacted.findIndex(user => user.user_id === user_id);
        comment.reactions.users_who_reacted.splice(indexToRemove, 1);
        comment.reactions[isUserReaction.reaction]--;
      } else if (isUserReaction && isUserReaction.reaction !== reaction) {
        // Si la reacción cambia, se elimina la anterior y se agrega la nueva
        const indexToRemove = comment.reactions.users_who_reacted.findIndex(user => user.user_id === user_id);
        comment.reactions.users_who_reacted.splice(indexToRemove, 1);
        comment.reactions[isUserReaction.reaction]--;
      //Acá despues de eliminar la reación anterior, agrego la nueva!
        comment.reactions.users_who_reacted.push(user_reaction);
        comment.reactions[reaction] = (comment.reactions[reaction] || 0) + 1;
      } else {
        // Si el usuario no reacciono nuca, se agrega la nueva reacción
        comment.reactions.users_who_reacted.push(user_reaction);
        comment.reactions[reaction] = (comment.reactions[reaction] || 0) + 1;
      }
  
      await comment.save();
  
      res.status(200).json({ message: 'Reacción actualizada exitosamente', updatedComment: comment });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CommentController };