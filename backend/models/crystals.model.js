const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const crystalsSchema = new Schema(
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
    givenSpells: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "spells",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crystal", crystalsSchema);
