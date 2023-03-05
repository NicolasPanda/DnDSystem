import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Play() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      navigate("/");
    }

    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/role");
    }
  }, [navigate]);

  return <Outlet />;
}

export default Play;
