const RESPONSE_INITIAL_STATE_CHARACTERS = "response_initial_state_characters";
const RESPONSE_CHANGE_CHARACTERS = "response_change_characters";
const RESPONSE_ADD_CHARACTERS = "response_add_characters";
const RESPONSE_DELETE_CHARACTERS = "response_delete_characters";
const SEND_REQUEST_INITIAL_STATE_CHARACTERS =
  "send_request_initial_state_characters";
const SEND_ADD_CHARACTERS = "send_add_characters";
const SEND_EDIT_CHARACTERS = "send_edit_characters";
const SEND_DELETE_CHARACTERS = "send_delete_characters";

class ActionCharacterService {
  constructor(socket, store) {
    this.socket = socket;
    this.store = store;
  }

  setupInitialStateListener() {
    this.socket.on(RESPONSE_INITIAL_STATE_CHARACTERS, ({ state }) => {
      const [, setCharacters] = this.store.useDoc("/characters");
      setCharacters(state);
      console.log("Initializing characters with state:", state);
    });

    this.socket.on(RESPONSE_ADD_CHARACTERS, ({ state }) => {
      const [, setCharacters] = this.store.useDoc("/characters");
      setCharacters((characters) => {
        characters.push(state);
      });
      console.log("Character add", state);
    });

    this.socket.on(RESPONSE_CHANGE_CHARACTERS, ({ state }) => {
      const [characters, setCharacters] = this.store.useDoc("/characters");
      const index = characters.findIndex((item) => item._id === state._id);
      setCharacters((character) => {
        character[index] = state;
      });
      console.log("Character change", state);
    });

    this.socket.on(RESPONSE_DELETE_CHARACTERS, ({ state }) => {
      const [characters, setCharacters] = this.store.useDoc("/characters");
      const index = characters.findIndex((item) => item._id === state._id);
      setCharacters((character) => {
        character.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(RESPONSE_INITIAL_STATE_CHARACTERS);
    this.socket.off(RESPONSE_ADD_CHARACTERS);
    this.socket.off(RESPONSE_CHANGE_CHARACTERS);
    this.socket.off(RESPONSE_DELETE_CHARACTERS);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(SEND_REQUEST_INITIAL_STATE_CHARACTERS, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  addCharacter(change, ErrorCallback) {
    this.socket.emit(SEND_ADD_CHARACTERS, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  editCharacter(change, id, ErrorCallback) {
    this.socket.emit(SEND_EDIT_CHARACTERS, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  deleteCharacter(id, ErrorCallback) {
    this.socket.emit(SEND_DELETE_CHARACTERS, { id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }
}

export function getInitialState() {
  return [];
}

export default ActionCharacterService;
