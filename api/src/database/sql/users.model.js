const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.User, {
        through: "user_has_subscriptions",
        as: "subscribers",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.User, {
        through: "user_has_subscriptions",
        as: "subscriptions",
        foreignKey: "subscriber_id",
      });
      User.hasMany(models.Subscription, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("client", "admin"),
        allowNull: false,
        defaultValue: "client",
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://res.cloudinary.com/dkgvoukdj/image/upload/v1702563393/pov/uaotuzpgadixhmaoxtxy.png'
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      modelName: "users",
      sequelize,
    }
  );

  return User;
};
