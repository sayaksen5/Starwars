import {
  render,
  screen,
  container,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { Component } from "react";
import CharacterDetails from "../Views/CharacterDetails";

jest.setTimeout(50000);

afterEach(cleanup);

//Check if the Component is rendering properly

describe("if CharacterDetails is rendering as expected", () => {
  test("should Display the character object ", () => {
    const { container } = render(
      <CharacterDetails
        characterView={[
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
        ]}
      />
    );
    const display1 = container.innerHTML.includes("Mr.ABC");
    const display2 = container.innerHTML.includes("MALE");
    const display3 = container.innerHTML.includes("FEMALE");

    expect(display1).toBe(true);
    expect(display2).toBe(true);
    expect(display3).toBe(false);
  });
});

//Checking initial color of favourites button

describe("Initial value of favourites button", () => {
  test("should be grey", () => {
    render(
      <CharacterDetails
        characterView={[
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
        ]}
      />
    );
    const ColorButton = screen.getByRole("button");
    expect(ColorButton).toHaveStyle({ color: "grey" });
  });
});

//Checking if clicking  to favourites changes the color
describe("if Favourites Button is working", () => {
  test("should change the color of the button ", () => {
    const { container } = render(
      <CharacterDetails
        characterView={[
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
        ]}
      />
    );
    const ColorButton = screen.getByRole("button");

    fireEvent.click(ColorButton);
    expect(ColorButton).toHaveStyle({ color: "red" });
  });
});

//Checking if Local Storage is getting updated

describe("if LocalStorage is working", () => {
  test("should return truthy from localStorage", () => {
    render(
      <CharacterDetails
        characterView={[
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
        ]}
      />
    );
    expect(JSON.parse(localStorage.getItem("favour"))).toBeTruthy();
  });
});

//Checking if View Favourites is working as expected
describe("Functional execution of View favourites button ", () => {
  test("should Open Favourites Page", () => {
    const { container } = render(
      <CharacterDetails
        characterView={[
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
    const Favourites = screen.getByRole("button");

    fireEvent.click(Favourites);
    const OpenFavourites = screen.getByText("View Favourites");

    fireEvent.click(OpenFavourites);
    const newScreen1 = container.innerHTML.includes("Remove from List");
    const newScreen2 = container.innerHTML.includes("Mr.EFG");

    //Assertions to check if Favourites Page is rendering as expected

    expect(newScreen1).toBe(true);
    expect(newScreen2).toBe(true);
  });
});

//Checking if clicking on favourites changes anything in the favourites page if the element is already there in the favourite List

describe("Checking if add to favourites is behaving as expected if the item is already in localstorage ", () => {
  test("should not render any item as clicking on already added to favourites item will unfavourite the item", () => {
    const { container } = render(
      <CharacterDetails
        characterView={[
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
    const Favourites = screen.getByRole("button");
    localStorage.clear();
    localStorage.setItem(
      "favour",
      JSON.stringify([
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
      ])
    );

    fireEvent.click(Favourites);
    const storageArray = JSON.parse(localStorage.getItem("favour"));
    expect(storageArray).toHaveLength(0);
  });
});
