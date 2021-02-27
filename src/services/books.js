import api from "./api";
import { APIs } from "../constants";

const getBooks = async ({ params } = { params: {} }) => {
  let url = APIs.books;
  const method = "get";
  const response = await api({
    url: url + (params.page || "1") + ".json",
    method,
  });

  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

const getBooksSearch = (books, str) => {
  if (str) {
    return books.filter((book) =>
      book.name.toLowerCase().includes(str.toLowerCase())
    );
  }
  return books;
};

export { getBooks, getBooksSearch };
