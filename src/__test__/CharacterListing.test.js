import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React, { Component } from "react";
import CharacterListing from "../Views/CharacterListing";

jest.setTimeout(50000);

afterEach(cleanup);

//Testing for Loader rendering
describe("checking if CharacterListing is rendering Loading", () => {
  test("should render the loader", () => {
    const { container } = render(<CharacterListing />);
    const headerScreen = container.innerHTML.includes("loading");
    expect(headerScreen).toBe(true);
  });
});

//Checking if the characters are displayed with Mockdata
describe("Testing for Characterdisplaying", () => {
  test("to check character display for custom input", () => {
    const { container } = render(
      <CharacterListing
        star={{
          results: [
            {
              name: "Mr.ABC",
              height: 172,
              mass: 45,
              gender: "male",
              homeworld: "https://swapi.dev/api/planets/1/",
            },
            {
              name: "Mr.XYZ",
              height: 145,
              mass: 85,
              gender: "female",
              homeworld: "https://swapi.dev/api/planets/1/",
            },
            {
              name: "Mrs.EFG",
              height: 164,
              mass: 75,
              gender: "male",
              homeworld: "https://swapi.dev/api/planets/1/",
            },
          ],
        }}
      />
    );

    const newScreen1 = container.innerHTML.includes("Mr.ABC");
    const newScreen2 = container.innerHTML.includes("Mr.XYZ");
    const newScreen3 = container.innerHTML.includes("FEMALE");
    const newScreen4 = container.innerHTML.includes("Hi there!");
    expect(newScreen1).toBe(true);
    expect(newScreen2).toBe(true);
    expect(newScreen3).toBe(true);
    expect(newScreen4).toBe(false);
  });
});

//Checking if CharacterDetails page opens on Clicking the name
describe("Testing for Name Clicking", () => {
  test("to check whether name clicking is working for character details page", () => {
    const { container } = render(
      <CharacterListing
        star={{
          results: [
            {
              name: "Mr.ABC",
              height: 172,
              mass: 45,
              gender: "male",
              homeworld: "https://swapi.dev/api/planets/1/",
              hair_color: "blue",
              eye_color: "brown",
              films: [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/3/",
              ],
              starships: [
                "https://swapi.dev/api/starships/12/",
                "https://swapi.dev/api/starships/22/",
              ],
            },

            {
              name: "Mrs.XYZ",
              height: 145,
              mass: 85,
              gender: "female",
              homeworld: "https://swapi.dev/api/planets/1/",
              hair_color: "black",
              eye_color: "green",
              films: [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/3/",
              ],
              starships: [
                "https://swapi.dev/api/starships/12/",
                "https://swapi.dev/api/starships/22/",
              ],
            },
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
          ],
        }}
      />
    );

    const nameElement1 = screen.getByText("Mr.ABC");

    fireEvent.click(nameElement1);

    expect(container.innerHTML.includes("BLUE")).toBe(true);
    expect(container.innerHTML.includes("Favourites")).toBe(true);
    expect(container.innerHTML.includes("FEMALE")).toBe(false);
  });
});
