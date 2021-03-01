import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import {
  getSearchBooksAction,
  clearSearchBooksAction,
} from "../../actions/books";
import store from "../../store/store";

import "./Header.css";

function Header({ title, searchStr }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
    if (!isSearchOpen) {
      setSearchText("");
    }
  }, [isSearchOpen]);

  const onSearchClick = () => {
    if (searchText) {
      store.dispatch((d, s) => getSearchBooksAction(d, s, searchText));
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const onBackClick = () => {
    if (searchStr) {
      store.dispatch(clearSearchBooksAction);
    }
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  };

  const onSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const onSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div
      className="header-container position-fixed w-100 px-2 d-flex align-items-center"
      style={{
        backgroundImage: `url(/Slices/nav_bar.png)`,
      }}
    >
      <div className="d-flex align-items-center w-100">
        <img
          alt=""
          src="/Slices/Back.png"
          className="back-icon mr-2"
          onClick={onBackClick}
        />
        {(isSearchOpen && (
          <input
            ref={searchInput}
            type="text"
            className="search-input mx-2"
            value={searchText}
            onChange={onSearchInputChange}
            onKeyDown={onSearchInputKeyDown}
          ></input>
        )) || <p className="text-white mb-0">{title}</p>}
      </div>
      <div className="d-flex align-items-center">
        <img
          alt=""
          src="/Slices/search.png"
          className="search-icon"
          onClick={onSearchClick}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchStr: state.appState.searchStr,
});

export default connect(mapStateToProps)(Header);
