const { Sequelize } = require("sequelize");

// Connections
const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  dialect: process.env.DIALECT,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  define: { timestamps: false },
});

// Agregar mongo y borrar este comentario

const Example = require("./lib/example/example.model")(
  sequelize,
  Sequelize.DataTypes
);

// Relations go here

// Example.hasMany(Other)
// Other.belongsTo(Example)

const dbInit = async () => {
  //   await Example.sync({ alter: true });
};

module.exports = {
  dbInit,
  sequelize,
  Sequelize,
  Example,
};
