const socketIO = require("socket.io");

let io;

function initializeIO(server) {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    console.log("id", socket.id);

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
