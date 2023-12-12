const socketIO = require("socket.io");

let io;

function initializeIO(server) {
   io = socketIO(server, {
    cors: {
      origin: process.env.APP_DOMAIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-Custom-Header",
      ],
    },
  });

  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    console.log("id", socket.id);

    // Unirse a una sala en especifico (grupo de chat)
    socket.on("join-room", (data) => {
      socket.join(data.user_id);
    });

    socket.on("message", (data) => {
      console.log("Received from client:", data);
    });

    socket.on("disconnect", () => {
      console.log("Un cliente se ha desconectado");
    });
  });
}

function getIO() {
  return io;
}

module.exports = { initializeIO, getIO };
