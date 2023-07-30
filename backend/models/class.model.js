const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    folder: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "folders",
    },
    icon: {
      type: String,
      required: true,
    },
    description: {},
    applyeffects: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "effects",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
