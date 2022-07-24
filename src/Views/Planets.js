import React, { useState, useEffect } from "react";

const Planets = ({ homeworld }) => {
  const [planet, setPlanet] = useState("");

  const planetData = async () => {
    try {
      const respone = await fetch(homeworld);
      const data = await respone.json();
      setPlanet(data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    planetData();
  }, []);
  return (
    <div>
      Planet: <span className="planet">{planet.name}</span>
    </div>
  );
};

export default Planets;
