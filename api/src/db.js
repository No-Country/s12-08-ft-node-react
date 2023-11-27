const { Sequelize } = require("sequelize");

// Connections
const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
  host: process.env.DATABASE_HOST,
  dialect: process.env.DIALECT,
  port: process.env.DATABASE_PORT,
  define: { timestamps: false },
  dialectOptions: {
  ssl: {
      ca: process.env.DATABASE_SSL_ROUTE,
      rejectUnauthorized: false,
  }
}
});

// Agregar mongo y borrar este comentario

const Example = require("./database/sql/examples.model")(
  sequelize,
  Sequelize.DataTypes
);

// Relations go here

// Example.hasMany(Other)
// Other.belongsTo(Example)


const dbInit = async () => {
  await Example.sync({ alter: true });
};

module.exports = {
  dbInit,
  sequelize,
  Sequelize,
  Example,
};
