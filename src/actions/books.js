import { getBooks, getBooksSearch } from "../services/books";

import { UPDATE_SEARCH_STR } from "./appState";

export const UPDATE_BOOKS_DATA = "UPDATE_BOOKS_DATA";
export const UPDATE_BOOKS_LIST = "UPDATE_BOOKS_LIST";
export const UPDATE_SEARCH_BOOKS = "UPDATE_SEARCH_BOOKS";

async function getBooksAction(dispatch, getState) {
  const { appState } = getState();
  const response = await getBooks();

  if (response && response.page) {
    dispatch({ type: UPDATE_BOOKS_DATA, payload: response.page });

    const booksList = getBooksSearch(
      response.page["content-items"].content,
      appState.searchStr
    );

    if (booksList) {
      dispatch({ type: UPDATE_BOOKS_LIST, payload: booksList });
    }
  }
}

async function getSearchBooksAction(dispatch, getState, str) {
  const { books, appState } = getState();
  const booksList = getBooksSearch(
    books["content-items"]?.content,
    str || appState.searchStr
  );

  if (booksList) {
    dispatch({ type: UPDATE_BOOKS_LIST, payload: booksList });
    dispatch({ type: UPDATE_SEARCH_STR, payload: str });
  }
}

async function clearSearchBooksAction(dispatch, getState) {
  const { books } = getState();

  dispatch({
    type: UPDATE_BOOKS_LIST,
    payload: books["content-items"]?.content || [],
  });
  dispatch({ type: UPDATE_SEARCH_STR, payload: "" });
}

async function getNextBooksAction(dispatch, getState) {
  const { books, appState } = getState();
  const params = {};

  if (
    books &&
    +books["total-content-items"] &&
    +books["total-content-items"] > books["content-items"].content.length
  ) {
    params.page = +books["page-num-requested"] + 1;
  } else {
    return;
  }

  let res = await getBooks({ params });

  if (res && res.page) {
    dispatch({
      type: UPDATE_BOOKS_DATA,
      payload: {
        ...res.page,
        "content-items": {
          ...books["content-items"],
          content: [
            ...books["content-items"].content,
            ...res.page["content-items"].content,
          ],
        },
      },
    });

    const booksList = getBooksSearch(
      [...books["content-items"].content, ...res.page["content-items"].content],
      appState.searchStr
    );

    if (booksList) {
      dispatch({ type: UPDATE_BOOKS_LIST, payload: booksList });
    }
  }
}

export {
  getBooksAction,
  getSearchBooksAction,
  clearSearchBooksAction,
  getNextBooksAction,
};
