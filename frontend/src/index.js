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
// import ActionFoldersService from "./actions/folders.action";
// import ActionEffectService from "./actions/effects.action";
import ActionService from "./actions/basic.action";

const socket = io(process.env.REACT_APP_SERVER_URI);

const services = {
  characters: new ActionCharacterService(socket, store),
  //basic
  folders: new ActionService(socket, store, "folders"),
  effects: new ActionService(socket, store, "effects"),
  races: new ActionService(socket, store, "races"),
  class: new ActionService(socket, store, "class"),
  crystals: new ActionService(socket, store, "crystals"),
  spells: new ActionService(socket, store, "spells"),
  enemies: new ActionService(socket, store, "enemies"),
  items: new ActionService(socket, store, "items"),
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SocketProvider socket={socket}>
    <ActionProvider services={services}>
      <SyncStateProvider store={store}>
        <App />
      </SyncStateProvider>
    </ActionProvider>
  </SocketProvider>
  // </React.StrictMode>
);
