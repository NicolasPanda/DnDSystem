const RESPONSE_INITIAL_STATE_FOLDERS = "response_initial_state_folders";
const RESPONSE_CHANGE_FOLDERS = "response_change_folders";
const RESPONSE_ADD_FOLDERS = "response_add_folders";
const RESPONSE_DELETE_FOLDERS = "response_delete_folders";
const SEND_REQUEST_INITIAL_STATE_FOLDERS = "send_request_initial_state_folders";
const SEND_ADD_FOLDERS = "send_add_folders";
const SEND_EDIT_FOLDERS = "send_edit_folders";
const SEND_DELETE_FOLDERS = "send_delete_folders";

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

    this.socket.on(RESPONSE_ADD_FOLDERS, ({ state }) => {
      const [, setFolders] = this.store.useDoc("/folders");
      setFolders((folders) => {
        folders.push(state);
      });
      console.log("Folder add", state);
    });

    this.socket.on(RESPONSE_CHANGE_FOLDERS, ({ state }) => {
      const [folders, setFolders] = this.store.useDoc("/folders");
      const index = folders.findIndex((item) => item._id === state._id);
      setFolders((folder) => {
        folder[index] = state;
      });
      console.log("Folder change", state);
    });

    this.socket.on(RESPONSE_DELETE_FOLDERS, ({ state }) => {
      const [folders, setFolders] = this.store.useDoc("/folders");
      const index = folders.findIndex((item) => item._id === state._id);
      setFolders((folder) => {
        folder.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(RESPONSE_INITIAL_STATE_FOLDERS);
    this.socket.off(RESPONSE_ADD_FOLDERS);
    this.socket.off(RESPONSE_CHANGE_FOLDERS);
    this.socket.off(RESPONSE_DELETE_FOLDERS);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(SEND_REQUEST_INITIAL_STATE_FOLDERS, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  addFolder(change, ErrorCallback) {
    this.socket.emit(SEND_ADD_FOLDERS, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  editFolder(change, id, ErrorCallback) {
    this.socket.emit(SEND_EDIT_FOLDERS, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  deleteFolder(id, ErrorCallback) {
    this.socket.emit(SEND_DELETE_FOLDERS, { id }, ({ error }) => {
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
