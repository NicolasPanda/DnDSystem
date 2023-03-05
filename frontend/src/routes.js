import { createBrowserRouter } from "react-router-dom";

import Main from "./view/Main";
import Play from "./view/Play";
import Error from "./view/Error";

import Login from "./view/login/Login";
import Role from "./view/login/Role";
import CreateCharacter from "./view/createCharacter/CreateCharacter";

import GM from "./view/gm/GM";

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
        path: "/role",
        element: <Role />,
      },
      {
        path: "/create-character",
        element: <CreateCharacter />,
      },
      {
        path: "/play",
        element: <Play />,
        children: [
          {
            path: "gm",
            element: <GM />,
          },
        ],
      },
    ],
  },
]);

export default router;
