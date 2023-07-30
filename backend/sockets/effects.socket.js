const {
  getInitEffects,
  addEffect,
  editEffect,
  deleteEffect,
} = require("../controllers/effects.controllers");

const RESPONSE_INITIAL_STATE_EFFECTS = "response_initial_state_effects";
const RESPONSE_CHANGE_EFFECT = "response_change_effect";
const RESPONSE_ADD_EFFECT = "response_add_effect";
const RESPONSE_DELETE_EFFECT = "response_delete_effect";
const SEND_REQUEST_INITIAL_STATE_EFFECTS = "send_request_initial_state_effects";
const SEND_ADD_EFFECT = "send_add_effect";
const SEND_EDIT_EFFECT = "send_edit_effect";
const SEND_DELETE_EFFECT = "send_delete_effect";

exports.SocketIO = (io) => {
  io.on("connection", (socket) => {
    //on initial state effects request
    socket.on(SEND_REQUEST_INITIAL_STATE_EFFECTS, async (acknowledge) => {
      try {
        const effects = await getInitEffects();
        socket.emit(RESPONSE_INITIAL_STATE_EFFECTS, { state: effects });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    //on add effect request
    socket.on(SEND_ADD_EFFECT, async ({ change }, acknowledge) => {
      try {
        const effect = await addEffect(change);
        io.emit(RESPONSE_ADD_EFFECT, { state: effect });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    //on edit effect request
    socket.on(SEND_EDIT_EFFECT, async ({ change, id }, acknowledge) => {
      try {
        const effect = await editEffect(change, id);
        io.emit(RESPONSE_CHANGE_EFFECT, { state: effect });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    //on delete effect request
    socket.on(SEND_DELETE_EFFECT, async ({ id }, acknowledge) => {
      try {
        const effect = await deleteEffect(id);
        io.emit(RESPONSE_DELETE_EFFECT, { state: effect });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });
  });
};
