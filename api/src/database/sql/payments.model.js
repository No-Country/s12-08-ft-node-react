const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {}

  Payment.init(
  {
    // Model attributes are defined here
  },
  {
    // Other model options go here
    modelName: 'payment',
    sequelize,
  },
);

  return Payment
}
