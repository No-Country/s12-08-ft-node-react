const { Chat } = require('../db');
const validations = require('../validations/chats.validations.js');

class ChatController {
  static async example(req,res,next) {
    console.log('example!');
    try {
      await validations.validateAsync(req.body);

      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { ChatController };