class ActionService {
  constructor(socket, store, actionType) {
    this.socket = socket;
    this.store = store;
    this.actionType = actionType;
    this.responseInitialState = `response_initial_state_${actionType}`;
    this.responseAdd = `response_add_${actionType}`;
    this.responseChange = `response_change_${actionType}`;
    this.responseDelete = `response_delete_${actionType}`;
    this.sendRequestInitialState = `send_request_initial_state_${actionType}`;
    this.sendAdd = `send_add_${actionType}`;
    this.sendEdit = `send_edit_${actionType}`;
    this.sendDelete = `send_delete_${actionType}`;
  }

  setupInitialStateListener() {
    this.socket.on(this.responseInitialState, ({ state }) => {
      const [, setItems] = this.store.useDoc(`/${this.actionType}`);
      setItems(state);
      console.log(`Initializing ${this.actionType} with state:`, state);
    });

    this.socket.on(this.responseAdd, ({ state }) => {
      const [, setItems] = this.store.useDoc(`/${this.actionType}`);
      setItems((items) => {
        items.push(state);
      });
    });

    this.socket.on(this.responseChange, ({ state }) => {
      const [items, setItems] = this.store.useDoc(`/${this.actionType}`);
      const index = items.findIndex((item) => item._id === state._id);
      setItems((item) => {
        item[index] = state;
      });
    });

    this.socket.on(this.responseDelete, ({ state }) => {
      const [items, setItems] = this.store.useDoc(`/${this.actionType}`);
      const index = items.findIndex((item) => item._id === state._id);
      setItems((item) => {
        item.splice(index, 1);
      });
    });
  }

  closeSocket() {
    this.socket.off(this.responseInitialState);
    this.socket.off(this.responseAdd);
    this.socket.off(this.responseChange);
    this.socket.off(this.responseDelete);
  }

  requestInitialState(ErrorCallback) {
    this.socket.emit(this.sendRequestInitialState, (error) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  add(change, ErrorCallback) {
    this.socket.emit(this.sendAdd, { change }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  edit(change, id, ErrorCallback) {
    this.socket.emit(this.sendEdit, { change, id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }

  delete(id, ErrorCallback) {
    this.socket.emit(this.sendDelete, { id }, ({ error }) => {
      if (error) {
        ErrorCallback(error);
      }
    });
  }
}

export function getInitialState() {
  return [];
}

export default ActionService;
