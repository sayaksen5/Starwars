import React, { useState, useEffect } from "react";
import Planets from "../../Views/Planets";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("favour"))) {
      const storageItems = JSON.parse(localStorage.getItem("favour"));
      setFavourites(storageItems);
    }
  }, []);

  const removeFromList = (item) => {
    const newFav = favourites.filter((obj) => obj.name !== item.name);
    setFavourites(newFav);
    localStorage.setItem("favour", JSON.stringify(newFav));
  };

  return (
    <div className="grid-holder">
      {favourites.length === 0 ? (
        <div>No favourites Added!!</div>
      ) : (
        favourites.map((item) => {
          return (
            <div className="favourites-container" key={item.name}>
              <div>
                Name: <span className="name">{item.name}</span>
              </div>
              <div>
                Height:{" "}
                <span className="height" style={{ fontWeight: "bold" }}>
                  {item.height}cms
                </span>
              </div>
              <div>
                Gender <span className="gender">{item.gender}</span>
              </div>
              <div>
                <Planets homeworld={item.homeworld} />
              </div>
              <button
                onClick={() => removeFromList(item)}
                className="btn-remove"
              >
                Remove from List
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FavouritesPage;
