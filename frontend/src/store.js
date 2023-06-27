import { createDocStore } from "@syncstate/core";

// Create a store with an initial state
const store = createDocStore({
  character: [],
});

export default store;
