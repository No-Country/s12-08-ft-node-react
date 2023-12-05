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
}

module.exports = { CommentController };