const { getInitFolders } = require("../controllers/folders.controllers");

const RESPONSE_INITIAL_STATE_FOLDERS = "response_initial_state_folders";
const RESPONSE_CHANGE_FOLDERS = "response_change_folders";
const RESPONSE_ADD_FOLDERS = "response_add_folders";
const RESPONSE_DELETE_FOLDERS = "response_delete_folders";
const SEND_REQUEST_INITIAL_STATE_FOLDERS = "send_request_initial_state_folders";
const SEND_ADD_FOLDERS = "send_add_folders";
const SEND_EDIT_FOLDERS = "send_edit_folders";
const SEND_DELETE_FOLDERS = "send_delete_folders";

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
    socket.on(SEND_ADD_FOLDERS, async (change, acknowledge) => {
      try {
        const folder = await addFolder(change);
        socket.emit(RESPONSE_ADD_FOLDERS, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on edit folder request
    socket.on(SEND_EDIT_FOLDERS, async (change, acknowledge) => {
      try {
        const folder = await editFolder(change);
        socket.emit(RESPONSE_CHANGE_FOLDERS, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on delete folder request
    socket.on(SEND_DELETE_FOLDERS, async (change, acknowledge) => {
      try {
        const folder = await deleteFolder(change);
        socket.emit(RESPONSE_DELETE_FOLDERS, { state: folder });
      } catch (error) {
        acknowledge(error);
      }
    });
  });
};
