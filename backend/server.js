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

const characterSocket = require("./sockets/characters.socket");
characterSocket.SocketIO(io);

//basic socket
const BasicController = require("./controllers/basic.controller");
const { BasicSocketIO } = require("./sockets/basic.socket");

const Folder = require("./models/folders.model");
const folderController = new BasicController(Folder);
BasicSocketIO(io, folderController, "folders");

const Effect = require("./models/effects.model");
const effectController = new BasicController(Effect);
BasicSocketIO(io, effectController, "effects");

const Race = require("./models/races.model");
const raceController = new BasicController(Race);
BasicSocketIO(io, raceController, "races");

const Class = require("./models/class.model");
const classController = new BasicController(Class);
BasicSocketIO(io, classController, "class");

const Crystal = require("./models/crystals.model");
const crystalController = new BasicController(Crystal);
BasicSocketIO(io, crystalController, "crystals");

const Spell = require("./models/spells.model");
const spellController = new BasicController(Spell);
BasicSocketIO(io, spellController, "spells");

const Enemy = require("./models/enemies.model");
const enemyController = new BasicController(Enemy);
BasicSocketIO(io, enemyController, "enemies");

const Item = require("./models/items.model");
const itemController = new BasicController(Item);
BasicSocketIO(io, itemController, "items");

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
