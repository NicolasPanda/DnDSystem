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
    parent: {
      type: Schema.Types.ObjectId,
      ref: "folders",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
