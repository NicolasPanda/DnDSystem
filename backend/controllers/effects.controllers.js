const Effect = require("../models/effects.model");

const getInitEffects = async () => {
  try {
    const effects = await Effect.find();
    return effects;
  } catch (error) {
    throw error;
  }
};

const addEffect = async (change) => {
  try {
    const effect = new Effect(change);
    await effect.save();
    return effect;
  } catch (error) {
    throw error;
  }
};

const editEffect = async (change, id) => {
  try {
    const effect = await Effect.findByIdAndUpdate(id, change, {
      new: true,
    });
    return effect;
  } catch (error) {
    throw error;
  }
};

const deleteEffect = async (id) => {
  try {
    const effect = await Effect.findByIdAndDelete(id);
    return effect;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getInitEffects,
  addEffect,
  editEffect,
  deleteEffect,
};
