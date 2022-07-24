import { render, container, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { Component } from "react";
import Planets from "../Views/Planets";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if the planet value is rendering
describe("Checking if planet value is rendering", () => {
  test("should give the planet name", async () => {
    const { container } = render(
      <Planets homeworld={"https://swapi.dev/api/planets/1/"} />
    );
    await waitFor(
      () => {
        const newScreen = container.innerHTML.includes("Tatooine");
        expect(newScreen).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

//Check to see if the error pop up is working
jest.spyOn(window, "alert").mockImplementation(() => {});
describe("Check to see if the error is displayed", () => {
  test("should give an error popup", async () => {
    const { container } = render(
      <Planets homeworld={"https://swapi.dev/api/plans/1/"} />
    );
    await waitFor(
      () => {
        expect(window.alert).toHaveBeenCalled();
      },
      { timeout: 30000 }
    );
  });
});
