const { Sequelize } = require("sequelize");
const mongoose = require('mongoose');
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


const mongoDbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@s12-08-ft-node-react@`);
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    throw error;
  }
}



// Agregar mongo y borrar este comentario

const Example = require("./database/sql/examples.model")(
  sequelize,
  Sequelize.DataTypes
);

const User = require("./database/sql/users.model")(
  sequelize,
  Sequelize.DataTypes
);

// Relations go here

// Example.hasMany(Other)
// Other.belongsTo(Example)


const dbInit = async () => {
  await Example.sync({ alter: true });
  await User.sync({ alter: true });
};

module.exports = {
  dbInit,
  sequelize,
  Sequelize,
  Example,
  mongoDbConnection,
  User
};
