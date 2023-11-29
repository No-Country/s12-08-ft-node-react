---
to: src/controllers/<%= entities %>.controller.js
---
const { <%= Entity %> } = require('../db.js');
const validations = require('../validations/<%= entities %>.validations.js');

class <%= Entity %>Controller {
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

module.exports = { <%= Entity %>Controller };