---
to: src/database/sql/<%= entities %>.model.js
---
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class <%= Entity %> extends Model {}

  <%= Entity %>.init(
  {
    // Model attributes are defined here
  },
  {
    // Other model options go here
    modelName: '<%= tableName %>',
    sequelize,
  },
);

  return <%= Entity %>
}
