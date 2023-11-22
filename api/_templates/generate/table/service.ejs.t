---
to: src/lib/<%= entities %>/<%= entities %>.service.js
---
const { <%= Entity %> } = require('../../db');
const validations = require('./<%= entities %>.validations');

class <%= Entity %>Service {
  static async example(req,res,next) {
    console.log('example!');
    try {
      await validations.example.validateAsync(attributes);

      // call db methods after validations have passed
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = <%= Entity %>Service ;