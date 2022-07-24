import {
  render,
  screen,
  cleanup,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React, { Component } from "react";
import Searchbar from "../Components/Features/Searchbar";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if searchbar is rendering with placeholder text
describe("if searchbar is rendering with placeholder text", () => {
  test("should render Searchbar with placeholder text", () => {
    const { container } = render(<Searchbar />);
    const placeholderText = screen.getByPlaceholderText(
      "type your Starwars hero"
    );
    expect(placeholderText).toBeInTheDocument();
  });
});

//Checking if search button is there

describe("to check if search button is there", () => {
  test("should render search button", () => {
    const { container } = render(<Searchbar />);
    const searchButton = container.innerHTML.includes("Search");
    expect(searchButton).toBe(true);
  });
});

//Checking if there are any text in the search field by default
describe("to check if there are any texts ", () => {
  test("should render nothing", () => {
    const { container } = render(<Searchbar />);
    const inputElement = screen.getByTestId("search-input");
    expect(inputElement.value).toBe("");
  });
});

//Checking if clicking on search button clears up the search bar
describe("to check if there are any texts after submission", () => {
  test("should render nothing", () => {
    const { container } = render(
      <Searchbar
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
    const inputElement = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-btn");
    inputElement.value = "Luke Skywalker";

    fireEvent.click(searchButton);

    expect(inputElement.value).toBe("");
  });
});

//Checking if clicking on search gives the error message

describe("to check if the error message is being displayed", () => {
  test("should render  the error message ", () => {
    const { container } = render(
      <Searchbar
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
    const inputElement = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-btn");
    inputElement.value = "Mr.MNO";

    fireEvent.click(searchButton);

    expect(container.innerHTML.includes("Oops Nothing found")).toBe(true);
  });
});

//Check to see if value is changing in the search bar

describe("to check if value is changing in searchbar", () => {
  test("should be able to change value in searchbar", () => {
    const { getByTestId } = render(<Searchbar />);
    fireEvent.change(getByTestId("search-input"), {
      target: { value: "Luke Skywalker" },
    });
    expect(getByTestId("search-input").value).toBe("Luke Skywalker");
  });
});
