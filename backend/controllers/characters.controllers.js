const Character = require("../models/characters.model");

const getInitCharacters = async () => {
  try {
    const characters = await Character.find();
    return characters;
  } catch (error) {
    throw error;
  }
};

const addCharacter = async (change) => {
  try {
    const character = new Character(change);
    await character.save();
    return character;
  } catch (error) {
    throw error;
  }
};

const editCharacter = async (change, id) => {
  try {
    const character = await Character.findByIdAndUpdate(id, change, {
      new: true,
    });
    return character;
  } catch (error) {
    throw error;
  }
};

const deleteCharacter = async (id) => {
  try {
    const character = await Character.findByIdAndDelete(id);
    return character;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getInitCharacters,
  addCharacter,
  editCharacter,
  deleteCharacter,
};
