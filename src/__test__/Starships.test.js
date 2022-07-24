import {
  render,
  container,
  cleanup,
  waitFor,
  screen,
  getByRole,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { Component } from "react";
import Starships from "../Views/Starships";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if Starship page is giving the expected Data
describe("Checking if Starship data is fetched and displayed correctly", () => {
  test("should make the API call and get the data", async () => {
    const { container } = render(
      <Starships
        starship={[
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/",
        ]}
      />
    );
    await waitFor(
      () => {
        const newScreen1 = container.innerHTML.includes("X-wing");
        const newScreen2 = container.innerHTML.includes("Imperial shuttle");
        expect(newScreen1).toBe(true);
        expect(newScreen2).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

//Checking if the error is being displayed in a popup
jest.spyOn(window, "alert").mockImplementation(() => {});
describe("Checking if error is being thrown at wrong url", () => {
  test("should make the API call and get the data", async () => {
    const { container } = render(
      <Starships
        starship={[
          "https://swapi.dev/api/starshi/12/",
          "https://swapi.dev/api/starshi/22/",
        ]}
      />
    );

    await waitFor(
      () => {
        expect(window.alert).toHaveBeenCalled();
      },
      { timeout: 10000 }
    );
  });
});
