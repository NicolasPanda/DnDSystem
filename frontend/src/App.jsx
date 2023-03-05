import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

function App() {
  return (
    <div className="flex flex-col h-full min-h-screen text-stone-100 bg-[#252525]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
