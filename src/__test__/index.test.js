import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "../App";
import { createRoot } from "react-dom/client";
import index from "../index";


describe("Application root", () => {
  test("should render without crashing", () => {
    expect(
      JSON.stringify(
        Object.assign({}, index, { _reactInternalInstance: "censored" })
      )
    ).toMatchInlineSnapshot(`"{\\"_reactInternalInstance\\":\\"censored\\"}"`);
  });
});
