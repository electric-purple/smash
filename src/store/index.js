import { createStore } from "redux";
import reducers from "./reducers";

export default function Store(initialState = {}) {
  return createStore(
    reducers,
    initialState
  );
}
