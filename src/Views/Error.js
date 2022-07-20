import React, { useState } from "react";
import SearchResult from "./SearchResult";

const Searchbar = ({ star }) => {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searched, setSearched] = useState("");
  let result;
  const valueSetter = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  const searchResults = () => {
    setSubmitted(true);
    result = star.results.filter((item) => item.name === search);

    setSearched(result);
    setSearch("");
  };

  return (
    <div>
      <div>
        <input
          value={search}
          onChange={valueSetter}
          placeholder="type your Starwars hero"
          className="search"
        ></input>
        <button onClick={searchResults} className="search-btn">
          Search
        </button>
      </div>
      {submitted && searched.length !== 0 ? (
        <SearchResult searched={searched} />
      ) : (
        ""
      )}
      <div>
        {submitted && searched.length === 0 ? "Oops Nothing found" : ""}
      </div>
    </div>
  );
};

export default Searchbar;
