class AlreadyExist extends Error {
    constructor(message) {
      super();
      this.name = this.constructor.name;
  
      this.message = message || "Already Exists";
      this.statusCode = 403;
    }
  }
  
  module.exports = AlreadyExist;
  