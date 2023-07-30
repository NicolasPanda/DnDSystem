const RESPONSE_INITIAL_STATE_FOLDERS = "response_initial_state_folders";
const RESPONSE_CHANGE_FOLDER = "response_change_folder";
const RESPONSE_ADD_FOLDER = "response_add_folder";
const RESPONSE_DELETE_FOLDER = "response_delete_folder";
const SEND_REQUEST_INITIAL_STATE_FOLDERS = "send_request_initial_state_folders";
const SEND_ADD_FOLDER = "send_add_folder";
const SEND_EDIT_FOLDER = "send_edit_folder";
const SEND_DELETE_FOLDER = "send_delete_folder";

class ActionFolderService {
  constructor(socket, store) {
    this.socket = socket;
    this.store = store;
  }

  setupInitialStateListener() {
    this.socket.on(RESPONSE_INITIAL_STATE_FOLDERS, ({ state }) => {
      const [, setFolders] = this.store.useDoc("/folders");
      setFolders(state);
      console.log("Initializing folders with state:", state);
    });

    this.socket.on(RESPONSE_ADD_FOLDER, ({ state }) => {
      const [, setFolders] = this.store.useDoc("/folders");
      setFolders((folders) => {
        folders.push(state);
      });
    });

    this.socket.on(RESPONSE_CHANGE_FOLDER, ({ state }) => {
      const [folders, setFolders] = this.store.useDoc("/folders");
      const index = folders.findIndex((item) => item._id === state._id);
      setFolders((folder) => {
        folder[index] = state;
      });
    });

    this.socket.on(RESPONSE_DELETE_FOLDER, ({ state }) => {
      const [folders, setFolders] = this.store.useDoc("/folders");
      const index = folders.findIndex((item) => item._id === state._id);
      setFolders((folder) => {
        folder.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(RESPONSE_INITIAL_STATE_FOLDERS);
    this.socket.off(RESPONSE_ADD_FOLDER);
    this.socket.off(RESPONSE_CHANGE_FOLDER);
    this.socket.off(RESPONSE_DELETE_FOLDER);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(SEND_REQUEST_INITIAL_STATE_FOLDERS, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  addFolder(change, ErrorCallback) {
    this.socket.emit(SEND_ADD_FOLDER, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  editFolder(change, id, ErrorCallback) {
    this.socket.emit(SEND_EDIT_FOLDER, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  deleteFolder(id, ErrorCallback) {
    this.socket.emit(SEND_DELETE_FOLDER, { id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }
}

export function getInitialState() {
  return [];
}

export default ActionFolderService;
