import { RouterProvider } from "react-router-dom";

import router from "./routes";

function App() {
  return (
    <div className="relative flex w-full h-screen max-h-screen overflow-y-auto bg-zinc-800 text-zinc-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
