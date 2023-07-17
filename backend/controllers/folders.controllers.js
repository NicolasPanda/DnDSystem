const Folder = require("../models/folders.model");

const getInitFolders = async () => {
  try {
    const folders = await Folder.find();
    return folders;
  } catch (error) {
    throw error;
  }
};

const addFolder = async (change) => {
  try {
    const folder = new Folder(change);
    await folder.save();
    return folder;
  } catch (error) {
    throw error;
  }
};

const editFolder = async (change, id) => {
  try {
    const folder = await Folder.findByIdAndUpdate(id, change, {
      new: true,
    });
    return folder;
  } catch (error) {
    throw error;
  }
};

const deleteFolder = async (id) => {
  try {
    const folder = await Folder.findByIdAndDelete(id);
    return folder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getInitFolders,
  addFolder,
  editFolder,
  deleteFolder,
};
