---
to: src/routes/<%= entities %>.js
---

const express = require("express");
const <%= entities %>Router = express.Router();
const { <%= entities %>Controller } = require("../controllers");

exampleRouter.get("/", <%= entities %>Controller.example);

module.exports = <%= entities %>Router;
