---
to: src/routes/<%= entities %>.js
---

const express = require("express");
const <%= entities %>Router = express.Router();
const { <%= Entity %>Controller } = require("../controllers/<%= entities %>.controller");

<%= entities %>Router.get("/", <%= Entity %>Controller.example);

module.exports = <%= entities %>Router;
