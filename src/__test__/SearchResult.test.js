import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React, { Component } from "react";
import SearchResult from "../Views/SearchResult";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if the results are rendered
describe("to check if the results are being displayed", () => {
  test("should display search results ", () => {
    const { container } = render(
      <SearchResult
        searched={[
          {
            name: "Mr.EFG",
            height: 164,
            mass: 75,
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            hair_color: "red",
            eye_color: "hazel",
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            starships: [],
          },
        ]}
      />
    );
    const newScreen1 = container.innerHTML.includes("RED");
    const newScreen2 = container.innerHTML.includes("164");
    const newScreen3 = container.innerHTML.includes("BLACK");

    expect(newScreen1).toBe(true);
    expect(newScreen2).toBe(true);
    expect(newScreen3).toBe(false);
  });
});
