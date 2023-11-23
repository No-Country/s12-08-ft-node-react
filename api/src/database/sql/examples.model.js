const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Example extends Model {}

  Example.init(
  {
    // Model attributes are defined here
  },
  {
    // Other model options go here
    modelName: 'example',
    sequelize,
  },
);

  return Example
}
