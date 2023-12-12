const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
  }

  Subscription.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      // Other model options go here
      modelName: "subscription",
      sequelize,
    }
  );

  return Subscription;
};
