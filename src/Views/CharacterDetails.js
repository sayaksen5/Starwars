import React, { useState, useEffect } from "react";
import Planets from "./Planets";
import Films from "./Films";
import Starships from "./Starships";
import FavouritesPage from "../Components/Features/FavouritesPage";

const CharacterDetails = ({ characterView }) => {
  const [favourites, setFavourites] = useState(false);
  const [openFav, setOpenFav] = useState(false);

  const addToFavourites = (item) => {
    setFavourites(!favourites);

    if (JSON.parse(localStorage.getItem("favour"))) {
      const oldItems = JSON.parse(localStorage.getItem("favour"));

      const checkDuplicate = oldItems.filter((obj) => obj.name === item.name);

      if (checkDuplicate.length === 0) {
        localStorage.setItem(
          "favour",
          JSON.stringify([...oldItems, characterView[0]])
        );
      } else {
        const newItems = oldItems.filter(
          (item) => item.name !== characterView[0].name
        );
        localStorage.setItem("favour", JSON.stringify(newItems));
      }
    } else localStorage.setItem("favour", JSON.stringify(characterView));
  };

  //Checking onload
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("favour"))) {
      const oldItems = JSON.parse(localStorage.getItem("favour"));
      const checkIfAdded = oldItems.filter(
        (item) => item.name === characterView[0].name
      );
      if (checkIfAdded.length > 0) {
        setFavourites(true);
      }
    }
  }, [characterView]);

  if (openFav) {
    return (
      <div>
        <FavouritesPage />
      </div>
    );
  }

  const OpenFavourites = () => {
    setOpenFav(true);
  };

  return (
    <div>
      <div style={{ backgroundColor: "green" }}>
        {" "}
        <h3 onClick={OpenFavourites} className="fav">
          View Favourites
        </h3>
      </div>
      {characterView.map((item) => {
        return (
          <div key={item.name} className="character-details">
            <div className="wrapper">
              <button
                onClick={() => addToFavourites(item)}
                style={{ color: favourites ? "red" : "grey", icon: "50x" }}
                className="btn-favourites"
              >
                &hearts; Favourites
              </button>
              <span className="name">
                <h2>{item.name}</h2>
              </span>
              <div className="hair-color">
                {" "}
                Hair Color:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {item.hair_color.toUpperCase()}
                </span>
              </div>
              <div className="eye-color">
                {" "}
                Eye Color:{" "}
                <span style={{ color: item.eye_color, fontSize: "20px" }}>
                  {item.eye_color.toUpperCase()}
                </span>
              </div>
              <div>
                {" "}
                Gender :<span> {item.gender.toUpperCase()}</span>
              </div>
              <span>
                {" "}
                <Planets homeworld={item.homeworld} />
              </span>

              <div className="films">
                <h3> Films</h3>
                <span>
                  <Films filmArray={item.films} />
                </span>
              </div>

              <span>
                <Starships starship={item.starships} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterDetails;
