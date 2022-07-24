import React, { useState } from "react";
import Loading from "./Loading";
import "../App.css";
import Planets from "./Planets";
import CharacterDetails from "./CharacterDetails";

const CharacterListing = (props) => {
  const { star } = props;

  const [clicked, setClicked] = useState(false);
  const [characterView, setCharacterView] = useState("");

  const characterDisplay = (e) => {
    setClicked(true);
    const name = e.target.textContent;
    const characterDetail = star.results.filter((item) => item.name === name);

    setCharacterView(characterDetail);
  };

  if (clicked) {
    return <CharacterDetails characterView={characterView} />;
  }

  if (star) {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>StarWars Heroes</h2>
        <div className="grid-holder">
          {star.results.map((item) => {
            const { name, height, mass, gender, homeworld, ...rest } = item;

            return (
              <div className="grid-container" key={name}>
                <div className="character-container">
                  <div className="character-list">
                    <div className="list">
                      <span>
                        Name:
                        <span className="name" onClick={characterDisplay}>
                          {name}
                          <br />
                        </span>
                      </span>
                      <span>
                        Gender:{" "}
                        <span className="gender">{gender.toUpperCase()}</span>
                        <br />
                      </span>
                      <span>
                        <Planets homeworld={homeworld} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else return <Loading />;
};

export default CharacterListing;
