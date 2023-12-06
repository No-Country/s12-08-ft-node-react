require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize, dbInit, mongoDbConnection } = require("./db");
const { swaggerDocs } = require("./config/swagger");
const { errorHandler, errorLogger } = require("./middlewares/errors/index");
const router = require("./routes/index");
const http = require("http");
const socketIO = require("socket.io");

const corsOptions = {
  origin: process.env.APP_DOMAIN || "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
const port = process.env.PORT || 3000;

function initializeApp() {
  const app = express();

  /*
   * Middlewares
   */
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cors(corsOptions));

  /*
   * Routes
   */
  app.get("/", async (req, res) => {
    res.redirect(301, "/api/docs");
  });

  app.get("/api/health-check", async (req, res) => {
    res.status(200).send("Stable");
  });
  // Comment this when not used
  app.use("/api", router);

  /*
   * Errors middleware
   */
  app.use(errorLogger);
  app.use(errorHandler);

  return app;
}

async function startServer() {
  try {
    // Auth de mongo
    await mongoDbConnection();
    // Auth de sequelize
    await sequelize.authenticate();
    console.log("Conexión establecida");
    // noSQL init

    // SQL init
    await dbInit();
    console.log("Base de datos sincronizada.");

    // start server
    const app = initializeApp();
    const server = http.createServer(app);
    const io = socketIO(server);
    // Docs > https://socket.io/docs/v4/server-initialization/

    io.on("connection", (socket) => {
      console.log("Un cliente se ha conectado");
      // Emit is the method for sending messages
      // and "new-message" is the event name I choose to listen to
      io.emit("new-message", "boenas");
      console.log("id", socket.id);

      // Here for example, the name of the event we recieve is different
      socket.on("message", (data) => {
        console.log("Received from client:", data);
        // Response to client (try it with Postman)
        io.emit("new-message", `Gracias por ${data}`);
      });

      socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado");
      });
    });

    server.listen(port, () => {
      console.log(`Api listening at http://localhost:${port}`);
      swaggerDocs(app, port);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = initializeApp;
