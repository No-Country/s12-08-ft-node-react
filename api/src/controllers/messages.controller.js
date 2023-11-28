const Messages = require('../database/mongo/messages.model.js');
const BadRequest = require('../errorClasses/BadRequest.js');
const {createMessageValidation} = require('../validations/messages.validations.js');

class MessageController {
  static async create(req,res,next) {
    console.log('example!');
    try {
      const {error, value } = createMessageValidation.validate(req.body);
      if(error){
        throw new BadRequest(error.details[0].message);
      }
      const { chat_id, user_id, content, image, video, gif } = value;


      const message = await Messages.create({
        chat_id, user_id, content, image, video, gif
      });

      // Enviar la respuesta con el nuevo usuario creado
      res.status(201).json({ message: 'Mensaje creado exitosamente', newMessage: message });
      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { MessageController };