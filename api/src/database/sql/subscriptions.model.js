const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: "user_id" });
      Subscription.hasMany(models.Payment, {
        foreignKey: "payment_id",
        as: "payments",
      });
    }
  }

  Subscription.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // payment_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      beneficiary_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
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
