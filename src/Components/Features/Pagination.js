import React from "react";
import "../../App.css";
import CharacterListing from "../../Views/CharacterListing";
const Pagination = ({
  count,

  setStars,
  star,
  url,

  setLoading,
}) => {
  let totalPages = [];
  if (count > 9) {
    const pagesNumber = Math.ceil(count / 10);

    for (let i = 1; i <= pagesNumber; i++) {
      totalPages.push(i);
    }
  }
  const pageNavigator = (e) => {
    setLoading(true);

    const pageNumber = Number(e.target.textContent);

    url = `https://swapi.dev/api/people/?page=${pageNumber}`;

    dataFetching();
  };

  const dataFetching = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStars(data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <CharacterListing star={star} />
      {totalPages.length > 1
        ? totalPages.map((item) => {
            return (
              <span className="pagination-container" key={item}>
                <button onClick={pageNavigator} className="btn-pagination">
                  {item}
                </button>
              </span>
            );
          })
        : ""}
    </div>
  );
};

export default Pagination;
