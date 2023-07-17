const { getInitCharacters } = require("../controllers/characters.controllers");

const RESPONSE_INITIAL_STATE_CHARACTERS = "response_initial_state_characters";
const RESPONSE_CHANGE_CHARACTERS = "response_change_characters";
const RESPONSE_ADD_CHARACTERS = "response_add_characters";
const RESPONSE_DELETE_CHARACTERS = "response_delete_characters";
const SEND_REQUEST_INITIAL_STATE_CHARACTERS =
  "send_request_initial_state_characters";
const SEND_ADD_CHARACTERS = "send_add_characters";
const SEND_EDIT_CHARACTERS = "send_edit_characters";
const SEND_DELETE_CHARACTERS = "send_delete_characters";

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
    socket.on(SEND_ADD_CHARACTERS, async (change, acknowledge) => {
      try {
        const character = await addCharacter(change);
        socket.emit(RESPONSE_ADD_CHARACTERS, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on edit character request
    socket.on(SEND_EDIT_CHARACTERS, async (change, acknowledge) => {
      try {
        const character = await editCharacter(change);
        socket.emit(RESPONSE_CHANGE_CHARACTERS, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });

    //on delete character request
    socket.on(SEND_DELETE_CHARACTERS, async (change, acknowledge) => {
      try {
        const character = await deleteCharacter(change);
        socket.emit(RESPONSE_DELETE_CHARACTERS, { state: character });
      } catch (error) {
        acknowledge(error);
      }
    });
  });
};
