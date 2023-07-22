require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

//socket
const connectionSocket = require("./sockets/connection.socket");
connectionSocket.SocketIO(io);

const folderSocket = require("./sockets/folders.socket");
folderSocket.SocketIO(io);

const characterSocket = require("./sockets/characters.socket");
characterSocket.SocketIO(io);

const effectSocket = require("./sockets/effects.socket");
effectSocket.SocketIO(io);

//routes
// const route_auth = require("./routes/route_auth");

const corsOptions = {
  origin: process.env.CLIENT_URI,
  methods: ["GET", "POST"],
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

const files_routes = require("./routes/files.routes");

//routes
app.use("/files", express.static("uploads/images"));
app.use("/files", files_routes);

//connect to db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DB_NAME).then(() => {
  console.log("\x1B[34mConnected to DB");
  //listen for requests
  http.listen(process.env.PORT, () => {
    console.log("\x1B[34mListening on port\x1B[31m", process.env.PORT);
  });
});
