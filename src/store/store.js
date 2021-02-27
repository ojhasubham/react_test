import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Import reducers
import books from "../reducers/books";
import appState from "../reducers/appState";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// add all reducers here
export const reducers = combineReducers({
  books: books,
  appState: appState,
});

const store = createStore(reducers, composedEnhancer);

export default store;
