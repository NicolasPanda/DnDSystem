import React, { createContext, useContext } from "react";

const ActionContext = createContext();

export function useAction() {
  return useContext(ActionContext);
}

export function ActionProvider({ services, children }) {
  return (
    <ActionContext.Provider value={services}>{children}</ActionContext.Provider>
  );
}
