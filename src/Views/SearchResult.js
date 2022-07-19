import React from "react";

const SearchResult = ({ searched }) => {
  return (
    <div className="search-result-container">
      {" "}
      <>
        {searched.map((item) => {
          return (
            <div className="search-result">
              <div className="search-name">
                Name: <span className="name"> {item.name}</span>
              </div>
              <span className="height">Height: {item.height}cms</span>
              <span className="hair_color">
                Hair Color: {item.hair_color.toUpperCase()}
              </span>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default SearchResult;
