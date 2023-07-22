import { createDocStore } from "@syncstate/core";

//state
import * as folders from "./actions/folders.action";
import * as characters from "./actions/characters.action";
import * as effects from "./actions/effects.action";

// Create a store with an initial state
const store = createDocStore({
  folders: folders.getInitialState(),
  characters: characters.getInitialState(),
  effects: effects.getInitialState(),
});

export default store;
