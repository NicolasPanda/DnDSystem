const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    race: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "races",
    },
    class: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "class",
    },
    crystals: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "crystals",
    },
    level: {
      type: Number,
      required: true,
    },
    xp: {
      type: Number,
      required: true,
    },
    hp: {
      value: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    shield: [
      {
        effectId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    focus: {
      value: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    spellPoints: {
      type: Number,
      required: true,
    },
    gold: {
      type: Number,
      required: true,
    },
    traits: {
      sexe: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
    lore: {
      type: String,
      required: true,
    },
    languages: [
      {
        type: String,
        required: true,
        enum: [
          "commun",
          "Commun approximatif",
          "elfique",
          "animal",
          "runique",
          "draconique",
        ],
      },
    ],
    professions: [
      {
        profession: {
          type: String,
          required: true,
          enum: [
            "blacksmithing",
            "tailoring",
            "jewelry",
            "enchanting",
            "alchemy",
            "cook",
            "butchering",
            "herbalism",
            "mining",
            "fishing",
          ],
        },
        level: {
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
    spellsCooldown: [
      {
        spellId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        turn: {
          type: Number,
          required: true,
        },
      },
    ],
    buffs: [
      {
        turn: {
          type: Number,
          required: true,
        },
        effectId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        diceRollSuccessRate: {
          type: Number,
          required: true,
        },
        currentDamageMag: {
          type: Number,
        },
        currentDamagePhy: {
          type: Number,
        },
      },
    ],
    recipes: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    inventory: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "items",
      },
    ],
    equipment: {
      helmet: {
        type: Schema.Types.ObjectId,
      },
      shoulders: {
        type: Schema.Types.ObjectId,
      },
      torso: {
        type: Schema.Types.ObjectId,
      },
      pants: {
        type: Schema.Types.ObjectId,
      },
      boots: {
        type: Schema.Types.ObjectId,
      },
      glove: {
        type: Schema.Types.ObjectId,
      },
      belt: {
        type: Schema.Types.ObjectId,
      },
      cloak: {
        type: Schema.Types.ObjectId,
      },
      ringLeft: {
        type: Schema.Types.ObjectId,
      },
      ringRight: {
        type: Schema.Types.ObjectId,
      },
      necklace: {
        type: Schema.Types.ObjectId,
      },
      mainHand: {
        type: Schema.Types.ObjectId,
      },
      secondHand: {
        type: Schema.Types.ObjectId,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);
