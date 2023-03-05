import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/buttons/Button";

function Role() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "GM") {
      navigate("/play/gm");
    } else if (storedRole) {
      navigate("/play/character");
    }
  }, [navigate]);

  const handleSetRole = (characterId) => {
    console.log(characterId);
  };

  const handleSetGM = () => {
    localStorage.setItem("role", "GM");
    navigate("/play/gm");
  };

  return (
    <div className="flex flex-col items-center h-full min-h-screen gap-8 py-4">
      <h1 className="font-bold">Who will you play during this adventure ?</h1>
      <Link to={"/create-character"}>
        <Button name="Create Character" />
      </Link>
      {/* list */}
      <div className="grid grid-cols-1 gap-4">
        {/* list item */}
        <div className="flex gap-2 p-3 rounded-md bg-stone-900">
          <img
            className="object-contain object-center h-24 rounded-md aspect-square"
            src="/assets/avatar/avatar.png"
            alt=""
          />
          <div className="flex flex-col font-bold text-stone-500">
            <h2 className="text-orange-200 ">Mayanne</h2>
            <p>Level : 2</p>
            <p>Class : Warrior</p>
            <p>Race : Human</p>
          </div>
        </div>
        {/* list item */}

        {/* GM */}
        <div
          className="flex flex-col items-center gap-2 p-3 font-bold border-2 border-red-500 rounded-md bg-stone-900"
          onClick={handleSetGM}
        >
          <h2 className="text-orange-200">Game Master</h2>
          <p className="text-center">
            Please do not click on this if <br /> you are not the Game Master !
          </p>
        </div>
      </div>
    </div>
  );
}

export default Role;
