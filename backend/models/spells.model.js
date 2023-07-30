const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spellsSchema = new Schema(
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
    diceNumber: {
      type: Number,
      required: true,
    },
    stat: {
      type: String,
      required: true,
      enum: [
        "strength",
        "vitality",
        "intelligence",
        "awareness",
        "talent",
        "speed",
        "luck",
        "evasion",
        "movement",
        "damageMag",
        "damagePhy",
        "armorMag",
        "armorPhy",
      ],
    },
    targetEffects: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "effects",
      },
    ],
    perfectEffects: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "effects",
      },
    ],
    requireItems: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "items",
      },
    ],
    requireClass: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "class",
      },
    ],
    requireRaces: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "races",
      },
    ],
    range: {
      type: Number,
      required: true,
    },
    cooldown: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Spell", spellsSchema);
