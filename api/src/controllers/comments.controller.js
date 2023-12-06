const Comments = require('../database/mongo/comments.model.js');
const Messages = require("../database/mongo/messages.model.js");
const {createCommentValidation, deleteCommentValidation} = require('../validations/comments.validations.js');
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
  static async delete(req, res, next) {
    req.body.user_id = req.user_id
    try {
      const { error, value } = deleteCommentValidation.validate(req.body);
      if (error) {
        throw new BadRequest(error.details[0].message);
      }

      const { user_id , chat_id, comment_id } = value;

      const comment = await Messages.findById(comment_id);

      if (!comment) {
        throw new BadRequest("Comentario no existe");
      }

      if ((user_id === chat_id || user_id === comment.suscriber_id)) {
        deletedComment = comment.deleteOne()
        const message = await Messages.findById(comment.message_id);
        message.comments = message.comments.flatMap((item) => {
          if (item.toString() === comment_id) {
            return []
          }
          return item
        })
        message.markModified("comments")
        message.save()
        res
        .status(201)
        .json({ message: "Comentario borrado exitosamente", deletedComment });
      }else {
        throw new Unauthorized("No es el propietario del mensaje");
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { CommentController };