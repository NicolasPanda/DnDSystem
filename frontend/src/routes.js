import { createBrowserRouter } from "react-router-dom";

import Main from "./view/Main";
import Error from "./view/Error";

import Login from "./view/Login";

import Player from "./view/Player/Player";
import Character from "./view/Player/Character";
import Stats from "./view/Player/Stats";
import Spell from "./view/Player/Spell";
import Equipment from "./view/Player/Equipment";
import Inventory from "./view/Player/Inventory";
import Chat from "./view/Player/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/player",
        element: <Player />,
        children: [
          {
            path: "character",
            element: <Character />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "spell",
            element: <Spell />,
          },
          {
            path: "equipment",
            element: <Equipment />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

export default router;
