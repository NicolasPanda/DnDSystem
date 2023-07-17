import { createDocStore } from "@syncstate/core";

//state
import * as folders from "./actions/folder.action";
import * as characters from "./actions/characters.action";

// Create a store with an initial state
const store = createDocStore({
  folders: folders.getInitialState(),
  character: characters.getInitialState(),
});

export default store;
