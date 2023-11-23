class BadRequest extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;

    this.message = message || "Bad request.";
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
