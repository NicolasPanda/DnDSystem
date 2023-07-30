const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enemiesSchema = new Schema(
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
    level: {
      type: Number,
      required: true,
    },
    races: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "races",
    },
    class: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "class",
    },
    baseStats: [
      {
        stats: {
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
        magnitude: {
          type: Number,
          required: true,
        },
      },
    ],
    spells: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "spells",
      },
    ],
    hp: {},
    shield: [{}],
    givenXP: {
      type: Number,
      required: true,
    },
    givenGold: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    givenItems: {
      item: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      dropChance: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enemie", enemiesSchema);
