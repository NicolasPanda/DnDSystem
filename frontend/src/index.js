import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//react-tippy
import "react-tippy/dist/tippy.css";

//SyncState
import store from "./store";
import { Provider as SyncStateProvider } from "@syncstate/react";

//socket.io
import io from "socket.io-client";
import { SocketProvider } from "./contexts/socket";

//action
import { ActionProvider } from "./actions/action";
import ActionCharacterService from "./actions/characters.action";
import ActionFoldersService from "./actions/folder.action";

const socket = io(process.env.REACT_APP_SERVER_URI);

const services = {
  folders: new ActionFoldersService(socket, store),
  characters: new ActionCharacterService(socket, store),
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider socket={socket}>
      <ActionProvider services={services}>
        <SyncStateProvider store={store}>
          <App />
        </SyncStateProvider>
      </ActionProvider>
    </SocketProvider>
  </React.StrictMode>
);
