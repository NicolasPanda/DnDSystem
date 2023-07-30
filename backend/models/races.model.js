const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const racesSchema = new Schema(
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
    ageMax: {
      type: Number,
      required: true,
    },
    averageWeight: {
      type: Number,
      required: true,
    },
    averageHeight: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
        required: true,
      },
    ],
    applyEffects: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "effects",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Race", racesSchema);
