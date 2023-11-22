---
to: src/controllers/<%= entities %>.service.js
---
const { <%= Entity %> } = require('../db');
const validations = require('../validations/<%= entities %>.validations.js');

class <%= Entity %>Controller {
  static async example(req,res,next) {
    console.log('example!');
    try {
      await validations.example.validateAsync(attributes);

      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = <%= Entity %>Controller ;