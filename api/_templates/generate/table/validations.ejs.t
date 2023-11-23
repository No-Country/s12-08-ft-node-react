---
to: src/validations/<%= entities %>.validations.js
---
const Joi = require('joi');

const <%= entities %>Validation = Joi.object({ });

module.exports = <%= entities %>Validation 