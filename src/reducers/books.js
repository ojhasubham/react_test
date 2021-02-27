import {
  UPDATE_SEARCH_BOOKS,
  UPDATE_BOOKS_DATA,
  UPDATE_BOOKS_LIST,
} from "../actions/books";

const initialState = {};

const books = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOKS_DATA:
      return { ...state, ...action.payload };
    case UPDATE_BOOKS_LIST:
      return { ...state, booksList: action.payload };
    case UPDATE_SEARCH_BOOKS:
      return state;
    default:
      return state;
  }
};

export default books;
