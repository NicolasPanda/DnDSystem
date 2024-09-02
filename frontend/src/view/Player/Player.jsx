import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { ReactComponent as CharacterIcon } from "../../assets/icons/Character_Icon.svg";
import { ReactComponent as StatsIcon } from "../../assets/icons/Stats_Icon.svg";
import { ReactComponent as SpellIcon } from "../../assets/icons/Spell_Icon.svg";
import { ReactComponent as EquipmentIcon } from "../../assets/icons/Equipment_Icon.svg";
import { ReactComponent as InventoryIcon } from "../../assets/icons/Inventory_Icon.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/Chat_Icon.svg";

function Player() {
  const getClassName = (isActive) =>
    `bg-purple-600 flex font-medium p-2 w-full items-center justify-center ${
      isActive ? "!bg-orange-200" : ""
    }`;
  return (
    <div>
      <div className="flex">
        <NavLink
          to={"character"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => (
            <CharacterIcon fill={isActive ? "#000" : "#fff"} />
          )}
        </NavLink>
        <NavLink
          to={"stats"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => <StatsIcon fill={isActive ? "#000" : "#fff"} />}
        </NavLink>
        <NavLink
          to={"Spell"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => <SpellIcon fill={isActive ? "#000" : "#fff"} />}
        </NavLink>
        <NavLink
          to={"equipment"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => (
            <EquipmentIcon fill={isActive ? "#000" : "#fff"} />
          )}
        </NavLink>
        <NavLink
          to={"inventory"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => (
            <InventoryIcon fill={isActive ? "#000" : "#fff"} />
          )}
        </NavLink>
        <NavLink
          to={"chat"}
          className={({ isActive }) => getClassName(isActive)}
        >
          {({ isActive }) => <ChatIcon fill={isActive ? "#000" : "#fff"} />}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Player;
