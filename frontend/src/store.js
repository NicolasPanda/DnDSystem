import { createDocStore } from "@syncstate/core";

//state
import * as characters from "./actions/characters.action";
import * as basic from "./actions/basic.action";

// Create a store with an initial state
const store = createDocStore({
  characters: characters.getInitialState(),
  folders: basic.getInitialState(),
  effects: basic.getInitialState(),
  races: basic.getInitialState(),
  class: basic.getInitialState(),
  crystals: basic.getInitialState(),
  spells: basic.getInitialState(),
  enemies: basic.getInitialState(),
  items: basic.getInitialState(),
});

export default store;
