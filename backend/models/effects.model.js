const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const effectSchema = new Schema(
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
    alignment: {
      type: String,
      required: true,
      enum: ["good", "bad", "neutral"],
    },
    duration: {
      type: Number,
      required: true,
    },
    modifiers: [
      {
        effectType: {
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
            "focus",
            "evasion",
            "movement",
            "damageMag",
            "damagePhy",
            "armorMag",
            "armorPhy",
            "applyDamagePhy",
            "applyDamageMag",
            "heal",
            "shield",
            "stun",
            "petrified",
            "scared",
            "shocked",
            "invincible",
            "invisible",
            "sleep",
            "resurrect",
          ],
        },
        magnitude: {
          type: Number,
          required: true,
        },
        operation: {
          type: String,
          required: true,
          enum: ["add", "subtract", "multiply", "divide"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Effect", effectSchema);
