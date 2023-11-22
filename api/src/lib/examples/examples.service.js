const { Example } = require("../../db");
const validations = require("./examples.validations");

class ExampleService {
  static async example(req, res, next) {
    console.log("example!");
    try {
      await validations.example.validateAsync(attributes);

      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ExampleService;
