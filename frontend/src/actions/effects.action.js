const RESPONSE_INITIAL_STATE_EFFECTS = "response_initial_state_effects";
const RESPONSE_CHANGE_EFFECT = "response_change_effect";
const RESPONSE_ADD_EFFECT = "response_add_effect";
const RESPONSE_DELETE_EFFECT = "response_delete_effect";
const SEND_REQUEST_INITIAL_STATE_EFFECTS = "send_request_initial_state_effects";
const SEND_ADD_EFFECT = "send_add_effect";
const SEND_EDIT_EFFECT = "send_edit_effect";
const SEND_DELETE_EFFECT = "send_delete_effect";

class ActionEffectService {
  constructor(socket, store) {
    this.socket = socket;
    this.store = store;
  }

  setupInitialStateListener() {
    this.socket.on(RESPONSE_INITIAL_STATE_EFFECTS, ({ state }) => {
      const [, setEffects] = this.store.useDoc("/effects");
      setEffects(state);
      console.log("Initializing effects with state:", state);
    });

    this.socket.on(RESPONSE_ADD_EFFECT, ({ state }) => {
      const [, setEffects] = this.store.useDoc("/effects");
      setEffects((effects) => {
        effects.push(state);
      });
    });

    this.socket.on(RESPONSE_CHANGE_EFFECT, ({ state }) => {
      const [effects, setEffects] = this.store.useDoc("/effects");
      const index = effects.findIndex((item) => item._id === state._id);
      setEffects((effect) => {
        effect[index] = state;
      });
    });

    this.socket.on(RESPONSE_DELETE_EFFECT, ({ state }) => {
      const [effects, setEffects] = this.store.useDoc("/effects");
      const index = effects.findIndex((item) => item._id === state._id);
      setEffects((effect) => {
        effect.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(RESPONSE_INITIAL_STATE_EFFECTS);
    this.socket.off(RESPONSE_ADD_EFFECT);
    this.socket.off(RESPONSE_CHANGE_EFFECT);
    this.socket.off(RESPONSE_DELETE_EFFECT);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(SEND_REQUEST_INITIAL_STATE_EFFECTS, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  addEffect(change, ErrorCallback) {
    this.socket.emit(SEND_ADD_EFFECT, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  editEffect(change, id, ErrorCallback) {
    this.socket.emit(SEND_EDIT_EFFECT, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  deleteEffect(id, ErrorCallback) {
    this.socket.emit(SEND_DELETE_EFFECT, { id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }
}

export function getInitialState() {
  return [];
}

export default ActionEffectService;
