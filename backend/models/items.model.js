const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = new Schema(
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
    itemType: {
      type: String,
      required: true,
      enum: ["item", "weapon", "equipment", "consumable", "recipe"],
    },
    maxStack: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {},
    rarity: {
      type: String,
      required: true,
      enum: ["common", "rare", "epic", "legendary", "mythic"],
    },
    level: {
      type: Number,
      required: true,
    },
    targetEffects: [
      {
        type: Schema.Types.ObjectId,
        ref: "effects",
      },
    ],
    applyEffects: [
      {
        type: Schema.Types.ObjectId,
        ref: "effects",
      },
    ],
    weaponType: {
      type: String,
      enum: ["twoHand", "oneHands", "shield"],
    },
    weaponStat: {
      type: String,
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
    weaponDiceNumber: {
      type: Number,
    },
    weaponBreakNoPerfect: {
      type: Boolean,
    },
    weaponPerfectTargetEffects: [
      {
        type: Schema.Types.ObjectId,
        ref: "effects",
      },
    ],
    equipmentSets: [
      {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
    ],
    equipmentSetsApplyEffects: [
      {
        type: Schema.Types.ObjectId,
        ref: "effects",
      },
    ],
    equipmentType: {
      type: String,
      enum: [
        "helmet",
        "shoulders",
        "torso",
        "cloak",
        "glove",
        "belt",
        "necklace",
        "pants",
        "ringLeft",
        "ringRight",
        "boots",
      ],
    },
    recipeGivenItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
    ],
    recipeRequireItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
    ],
    recipeRequireProfession: {
      type: String,
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
    recipeRequireProfessionLevel: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemsSchema);
