exports.BasicSocketIO = (io, controller, actionType) => {
  const responseInitialState = `response_initial_state_${actionType}`;
  const responseAdd = `response_add_${actionType}`;
  const responseChange = `response_change_${actionType}`;
  const responseDelete = `response_delete_${actionType}`;
  const sendRequestInitialState = `send_request_initial_state_${actionType}`;
  const sendAdd = `send_add_${actionType}`;
  const sendEdit = `send_edit_${actionType}`;
  const sendDelete = `send_delete_${actionType}`;

  io.on("connection", (socket) => {
    socket.on(sendRequestInitialState, async (acknowledge) => {
      try {
        const items = await controller.getInitItems();
        socket.emit(responseInitialState, { state: items });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    socket.on(sendAdd, async ({ change }, acknowledge) => {
      try {
        const item = await controller.addItem(change);
        io.emit(responseAdd, { state: item });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    socket.on(sendEdit, async ({ change, id }, acknowledge) => {
      try {
        const item = await controller.editItem(change, id);
        io.emit(responseChange, { state: item });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });

    socket.on(sendDelete, async ({ id }, acknowledge) => {
      try {
        const item = await controller.deleteItem(id);
        io.emit(responseDelete, { state: item });
      } catch (error) {
        acknowledge({ error: error.message });
      }
    });
  });
};
