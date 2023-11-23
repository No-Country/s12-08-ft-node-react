class NotFound extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;

    this.message = message || "Resource not found.";
    this.statusCode = 404;
  }
}

module.exports = NotFound;
