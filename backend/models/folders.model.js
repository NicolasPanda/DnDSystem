const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["effects", "enemies", "items", "spells"],
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
