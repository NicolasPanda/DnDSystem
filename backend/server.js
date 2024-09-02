require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: process.env.CLIENT_URI,
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());

// routes
//TODO: add routes

//connect to db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");

  // listen for requests
  const PORT = process.env.PORT || 4000;
  http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
