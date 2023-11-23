class Unauthorized extends Error {
    constructor(message, name) {
      super();
      this.name = name || this.constructor.name;
  
      this.message = message || 'Unauthorized.';
      this.statusCode = 401;
    }
  }
  
  module.exports = Unauthorized;