const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Subscription, {
        foreignKey: "payment_id",
        as: "paid_subscription",
      });
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      invoice: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pay_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM("paypal", "stripe"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "ok", "error"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      // Other model options go here
      modelName: "payment",
      sequelize,
    }
  );

  return Payment;
};
