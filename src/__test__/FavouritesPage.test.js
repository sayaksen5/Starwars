import {
  render,
  screen,
  container,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { Component } from "react";
import FavouritesPage from "../Components/Features/FavouritesPage";

jest.setTimeout(50000);

afterEach(cleanup);

//FavouritesPage is rendering is already tested from CharacterDetails.test.js.

//We will now be checking if the Favourites Page loads any object from localStorage by default
describe("Checking if an empty localStorage value is loaded", () => {
  test("should not Display any object", () => {
    const { container } = render(<FavouritesPage />);
    //By default there should not be any item in favourites. Checking the same now.
    const newScreen1 = container.innerHTML.includes("No favourites Added!!");
    expect(newScreen1).toBe(true);
  });
});
//We will now be checking if the FavouritesPage loads any object present in localStoragedescribe("Checking if an empty localStorage value is loaded", () => {
describe("Checking if an empty localStorage value is loaded", () => {
  test("should not Display any object", () => {
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
    const { container } = render(<FavouritesPage />);
    //It should now render the object
    const newScreen1 = container.innerHTML.includes("164");
    expect(newScreen1).toBe(true);
  });
});

//Checking the remove button functionality

describe("Checking if remove button is working", () => {
  test("should remove the object and return Empty page", () => {
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
    const { container } = render(<FavouritesPage />);
    //It should now render the object
    const removeButton = screen.getByText("Remove from List");
    fireEvent.click(removeButton);
    const newScreen1 = container.innerHTML.includes("164");
    const newScreen2 = container.innerHTML.includes("No favourites Added!!");
    expect(newScreen1).toBe(false);
    expect(newScreen2).toBe(true);
  });
});
