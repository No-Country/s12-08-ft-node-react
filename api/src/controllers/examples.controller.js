const { Example } = require('../db');
const validations = require('../validations/examples.validations.js');

class ExampleController {
  static async example(req,res,next) {
    console.log('example!');
    try {
      await validations.validateAsync(req.body);
      
      return res.status( 200 ).json({ result: 'Successful example' }); 
      // call db methods after validations have passed
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { ExampleController };