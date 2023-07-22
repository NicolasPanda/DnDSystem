import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAction } from "../actions/action";

function Main() {
  const action = useAction();

  useEffect(() => {
    //initial state listener
    action.folders.setupInitialStateListener();
    action.characters.setupInitialStateListener();
    action.effects.setupInitialStateListener();

    //request initial state
    action.folders.requestInitialState();
    action.characters.requestInitialState();
    action.effects.requestInitialState();

    return () => {
      action.folders.closeSocket();
      action.characters.closeSocket();
      action.effects.closeSocket();
    };
  }, [action.folders, action.characters, action.effects]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Main;
