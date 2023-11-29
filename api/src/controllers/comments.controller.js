const { Comment } = require('../db.js');
const validations = require('../validations/comments.validations.js');

class CommentController {
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

module.exports = { CommentController };