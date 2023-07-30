const RESPONSE_INITIAL_STATE_CHARACTERS = "response_initial_state_characters";
const RESPONSE_CHANGE_CHARACTER = "response_change_character";
const RESPONSE_ADD_CHARACTER = "response_add_character";
const RESPONSE_DELETE_CHARACTER = "response_delete_character";
const SEND_REQUEST_INITIAL_STATE_CHARACTERS =
  "send_request_initial_state_characters";
const SEND_ADD_CHARACTER = "send_add_character";
const SEND_EDIT_CHARACTER = "send_edit_character";
const SEND_DELETE_CHARACTER = "send_delete_character";

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

    this.socket.on(RESPONSE_ADD_CHARACTER, ({ state }) => {
      const [, setCharacters] = this.store.useDoc("/characters");
      setCharacters((characters) => {
        characters.push(state);
      });
    });

    this.socket.on(RESPONSE_CHANGE_CHARACTER, ({ state }) => {
      const [characters, setCharacters] = this.store.useDoc("/characters");
      const index = characters.findIndex((item) => item._id === state._id);
      setCharacters((character) => {
        character[index] = state;
      });
    });

    this.socket.on(RESPONSE_DELETE_CHARACTER, ({ state }) => {
      const [characters, setCharacters] = this.store.useDoc("/characters");
      const index = characters.findIndex((item) => item._id === state._id);
      setCharacters((character) => {
        character.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(RESPONSE_INITIAL_STATE_CHARACTERS);
    this.socket.off(RESPONSE_ADD_CHARACTER);
    this.socket.off(RESPONSE_CHANGE_CHARACTER);
    this.socket.off(RESPONSE_DELETE_CHARACTER);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(SEND_REQUEST_INITIAL_STATE_CHARACTERS, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  addCharacter(change, ErrorCallback) {
    this.socket.emit(SEND_ADD_CHARACTER, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  editCharacter(change, id, ErrorCallback) {
    this.socket.emit(SEND_EDIT_CHARACTER, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  deleteCharacter(id, ErrorCallback) {
    this.socket.emit(SEND_DELETE_CHARACTER, { id }, ({ error }) => {
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
