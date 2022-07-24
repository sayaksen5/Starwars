import React, { useState, useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FcFilm } from "react-icons/fc";
const Films = ({ filmArray }) => {
  const [filmList, setFilmList] = useState([]);

  const filmData = (arr) => {
    arr.map((item) => {
      const films = async () => {
        try {
          const response = await fetch(item);
          const data = await response.json();
          setFilmList((filmList) => [...filmList, data.title]);
        } catch (error) {
          alert(error);
        }
      };
      films(filmArray);
    });
  };
  useEffect(() => {
    filmData(filmArray);
  }, []);

  return (
    <div>
      {[...new Set(filmList)].map((item) => {
        return (
          <div key={Math.floor(Math.random() * Date.now())}>
            <ul>
              <li className="list">
                <AiOutlineDoubleRight /> {item} <FcFilm />
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Films;
