import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import React, { Component } from "react";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if heading text is there
test("Checking if Heading is there", () => {
  render(<App />);
  const textElements = screen.getByText(/Star Wars Heroes/i);
  expect(textElements).toBeInTheDocument();
});

//Checking if heading is showing the correct Styles

test("Check to Find Correct Styles", () => {
  render(<App />);
  const ColorStyle = screen.getByRole("header");
  expect(ColorStyle).toHaveStyle({ backgroundColor: "blue", height: "60px" });
});

//Checking if searchbar is rendering
describe("Parent Component rendering Child", () => {
  test("renders Child component Searchbar", () => {
    const { container } = render(<App />);
    const mockSearchbar = container.innerHTML.includes("search-btn");
    expect(mockSearchbar).toBe(true);
  });
});

//Checking if Loader is rendering

describe("Parent Component rendering Child", () => {
  test("renders Child component Loader", () => {
    const { container } = render(<App />);
    const mockLoader = container.innerHTML.includes("loader");
    expect(mockLoader).toBe(true);
  });
});

//Checking if App is rendering Pagination
describe("Parent Component rendering Child", () => {
  test("renders Child component Pagination", async () => {
    const { container } = render(<App url={"https://swapi.dev/api/people/"} />);
    await waitFor(
      () => {
        const mockPagination = container.innerHTML.includes("1");
        expect(mockPagination).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

//Checking if API call is successful
describe("API call successfull", () => {
  test("API call successfull", async () => {
    const { container } = render(<App url={"https://swapi.dev/api/people/"} />);
    await waitFor(
      () => {
        const mockAPICall = container.innerHTML.includes("Luke Skywalker");
        expect(mockAPICall).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("API call unsuccessfull", () => {
  test("API call unsuccessfull", async () => {
    const { container } = render(
      <App url={"https://swapi.dev/apes/people/"} />
    );
    await waitFor(
      () => {
        // const mockAPICall = container.innerHTML.includes("Luke Skywalker");
        expect(window.alert).toHaveBeenCalled();
        // expect(mockAPICall).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});
