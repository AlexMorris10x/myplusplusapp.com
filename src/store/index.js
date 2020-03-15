import { Store } from "simple-shared-state";

const state = {
  error: null,
  loading: true,
  loggedIn: false,
  redirectTo: "",
  username: "",
  projects: [],
  todos: []
};

const store = new Store(state);

export { store };

export const setState = obj => {
  store.dispatch(obj);
};

// test comment
