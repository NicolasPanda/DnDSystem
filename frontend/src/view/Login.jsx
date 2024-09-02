import React from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const connect = () => {
    navigate("/player/stats");
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <button
        className="bg-blue-500 font-medium p-2 px-8 rounded-lg"
        onClick={connect}
      >
        Connect
      </button>
    </div>
  );
}

export default Login;
