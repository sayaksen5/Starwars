import React, { useState, useEffect } from "react";
import { SiStarship } from "react-icons/si";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Starships = ({ starship }) => {
  const [starshipList, setStarshipList] = useState([]);

  const StarshipData = (arr) => {
    arr.map((item) => {
      const starships = async () => {
        try {
          const response = await fetch(item);
          const data = await response.json();
          setStarshipList((starshipList) => [...starshipList, data.name]);
        } catch (error) {
          alert(error);
        }
      };
      return starships(starship);
    });
  };

  useEffect(() => {
    StarshipData(starship);
  }, [starship]);

  return (
    <>
      <h3>Starships Flown</h3>

      <div>
        {[...new Set(starship)].length > 0
          ? [...new Set(starshipList)].map((item) => {
              return (
                <div key={Math.floor(Math.random() * Date.now())}>
                  <ul>
                    <li className="list">
                      <AiOutlineDoubleRight /> {item} <SiStarship />
                    </li>
                  </ul>
                </div>
              );
            })
          : "No starships Flown"}
      </div>
    </>
  );
};

export default Starships;
