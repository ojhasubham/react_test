import { UPDATE_SEARCH_STR } from "../actions/appState";

const initialState = {
  searchStr: "",
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_STR:
      return { ...state, searchStr: action.payload };
    default:
      return state;
  }
};

export default appState;
