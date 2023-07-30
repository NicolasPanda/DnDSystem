import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAction } from "../actions/action";

function Main() {
  const action = useAction();

  useEffect(() => {
    const basicAction = [
      "folders",
      "effects",
      "races",
      "class",
      "crystals",
      "spells",
      "enemies",
      "items",
    ];
    //initial state listener
    action.characters.setupInitialStateListener();

    //basic action listener
    basicAction.forEach((actionName) => {
      action[actionName].setupInitialStateListener();

      action[actionName].requestInitialState();
    });

    //request initial state
    action.characters.requestInitialState();

    return () => {
      action.characters.closeSocket();

      basicAction.forEach((actionName) => {
        action[actionName].closeSocket();
      });
    };
  }, [action]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Main;
