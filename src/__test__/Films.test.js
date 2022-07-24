import { render, container, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { Component } from "react";
import Films from "../Views/Films";

jest.setTimeout(50000);

afterEach(cleanup);

//Checking if films are being rendered
describe("Checking if Films is giving the desired result", () => {
  test("should render film names", async () => {
    const { container } = render(
      <Films
        filmArray={[
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/",
        ]}
      />
    );
    await waitFor(
      () => {
        const newScreen1 = container.innerHTML.includes("A New Hope");
        const newScreen2 = container.innerHTML.includes(
          "The Empire Strikes Back"
        );
        const newScreen3 = container.innerHTML.includes("Return of the Jedi");
        expect(newScreen1 && newScreen2 && newScreen3).toBe(true);
      },
      { timeout: 30000 }
    );
  });
});

//Checking if Films is throwing the required error on wrong api
jest.spyOn(window, "alert").mockImplementation(() => {});

describe("Checking if Films is giving the required error popup for wrong API calls", () => {
  test("should render alert ", async () => {
    const { container } = render(
      <Films
        filmArray={[
          "https://swapi.dev/api/fis/1/",
          "https://swapi.dev/api/fims/2/",
          "https://swapi.dev/api/lms/3/",
        ]}
      />
    );
    await waitFor(
      () => {
        expect(window.alert).toHaveBeenCalled();
      },
      { timeout: 30000 }
    );
  });
});
