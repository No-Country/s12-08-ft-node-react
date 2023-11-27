const { User } = require('../database/sql/users.model.js');
const validations = require('../validations/users.validations.js');

class UserController {
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

module.exports = { UserController };