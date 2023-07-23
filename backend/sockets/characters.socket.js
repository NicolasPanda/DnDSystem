const {
  getInitCharacters,
  addCharacter,
  editCharacter,
  deleteCharacter,
} = require("../controllers/characters.controllers");

const RESPONSE_INITIAL_STATE_CHARACTERS = "response_initial_state_characters";
const RESPONSE_CHANGE_CHARACTER = "response_change_character";
const RESPONSE_ADD_CHARACTER = "response_add_character";
const RESPONSE_DELETE_CHARACTER = "response_delete_character";
const SEND_REQUEST_INITIAL_STATE_CHARACTERS =
  "send_request_initial_state_characters";
const SEND_ADD_CHARACTER = "send_add_character";
const SEND_EDIT_CHARACTER = "send_edit_character";
const SEND_DELETE_CHARACTER = "send_delete_character";

exports.SocketIO = (io) => {
  io.on("connection", (socket) => {
    //on initial state characters request
    socket.on(SEND_REQUEST_INITIAL_STATE_CHARACTERS, async (acknowledge) => {
      try {
        const characters = await getInitCharacters();
        socket.emit(RESPONSE_INITIAL_STATE_CHARACTERS, { state: characters });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on add character request
    socket.on(SEND_ADD_CHARACTER, async ({ change }, acknowledge) => {
      try {
        const character = await addCharacter(change);
        socket.emit(RESPONSE_ADD_CHARACTER, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on edit character request
    socket.on(SEND_EDIT_CHARACTER, async ({ change, id }, acknowledge) => {
      try {
        const character = await editCharacter(change, id);
        socket.emit(RESPONSE_CHANGE_CHARACTER, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on delete character request
    socket.on(SEND_DELETE_CHARACTER, async ({ id }, acknowledge) => {
      try {
        const character = await deleteCharacter(id);
        socket.emit(RESPONSE_DELETE_CHARACTER, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });
  });
};
