import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./index";

const configureStore = () => {
  const dev = process.env.NODE_ENV !== "production";

  let enhancer;

  const mware = applyMiddleware(thunk);

  if (dev) {
    enhancer = compose(composeWithDevTools(mware));
  } else {
    enhancer = compose(mware);
  }

  const store = createStore(rootReducer, enhancer);

  return store;
};

const wrapper = createWrapper(configureStore, { debug: false });

export default wrapper;
