const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {}

  Subscription.init(
  {
    // Model attributes are defined here
  },
  {
    // Other model options go here
    modelName: 'subscription',
    sequelize,
  },
);

  return Subscription
}
