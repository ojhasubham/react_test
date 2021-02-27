export const UPDATE_THEME = "UPDATE_THEME";
export const UPDATE_SEARCH_STR = "UPDATE_SEARCH_STR";

async function updateSearchStr(dispatch, getState, searchStr) {
  dispatch({ type: UPDATE_SEARCH_STR, payload: searchStr });
}

export { updateSearchStr };
