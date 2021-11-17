import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../components/Input";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

describe("<Input />", () => {
  test("should display an input", async () => {});
});

describe("Input", () => {
  it("should contain 1", () => {
    // create the div wherein the app runs
    let container = document.createElement("div");
    document.body.appendChild(container);
    let textarea = document.createElement("textarea");
    let div = document.createElement("div");
    div.classList.add("input");
    let parent = document.createElement("div");
    div.appendChild(parent);
    parent.appendChild(textarea);
    // run as though it was on a browser
    act(() => {
      ReactDOM.render(<Input />, container);
    });

    expect(textarea.textContent).toBe(1);
  });
});

export {};
