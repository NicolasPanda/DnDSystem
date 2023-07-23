const {
  getInitFolders,
  addFolder,
  editFolder,
  deleteFolder,
} = require("../controllers/folders.controllers");

const RESPONSE_INITIAL_STATE_FOLDERS = "response_initial_state_folders";
const RESPONSE_CHANGE_FOLDER = "response_change_folder";
const RESPONSE_ADD_FOLDER = "response_add_folder";
const RESPONSE_DELETE_FOLDER = "response_delete_folder";
const SEND_REQUEST_INITIAL_STATE_FOLDERS = "send_request_initial_state_folders";
const SEND_ADD_FOLDER = "send_add_folder";
const SEND_EDIT_FOLDER = "send_edit_folder";
const SEND_DELETE_FOLDER = "send_delete_folder";

exports.SocketIO = (io) => {
  io.on("connection", (socket) => {
    //on initial state folders request
    socket.on(SEND_REQUEST_INITIAL_STATE_FOLDERS, async (acknowledge) => {
      try {
        const folders = await getInitFolders();
        socket.emit(RESPONSE_INITIAL_STATE_FOLDERS, { state: folders });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on add folder request
    socket.on(SEND_ADD_FOLDER, async ({ change }, acknowledge) => {
      try {
        const folder = await addFolder(change);
        socket.emit(RESPONSE_ADD_FOLDER, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on edit folder request
    socket.on(SEND_EDIT_FOLDER, async ({ change, id }, acknowledge) => {
      try {
        const folder = await editFolder(change, id);
        socket.emit(RESPONSE_CHANGE_FOLDER, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on delete folder request
    socket.on(SEND_DELETE_FOLDER, async ({ id }, acknowledge) => {
      try {
        const folder = await deleteFolder(id);
        socket.emit(RESPONSE_DELETE_FOLDER, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });
  });
};
