exports.SocketIO = (io) => {
  io.on("connection", (socket) => {
    //first connection
    console.log(socket.id);
  });
};
