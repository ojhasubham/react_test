import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";

import { getBooksAction, getNextBooksAction } from "../../actions/books";
import store from "../../store/store";
import BookTile from "../../components/BookTile";
import Header from "../../components/Header";

import "./home.css";

function Home({ booksData, isFetching, searchStr }) {
  useEffect(() => {
    store.dispatch(getBooksAction);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;

      store.dispatch(getNextBooksAction);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (booksData) {
    return (
      <div className="">
        <Header title={searchStr || booksData.title} />
        <Container className="home-container">
          <Row className="px-1">
            {booksData.booksList &&
              booksData.booksList.map((item, index) => (
                <Col xs={4} key={item.name + index} className="px-1">
                  <BookTile data={item} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    );
  }

  return null;
}

const mapStateToProps = (state) => ({
  booksData: state.books,
  isFetching: state.appState.isFetching,
  searchStr: state.appState.searchStr,
});

export default connect(mapStateToProps)(Home);
