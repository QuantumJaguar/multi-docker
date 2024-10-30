import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// Set up the mock adapter
const mock = new axiosMockAdapter(axios);

// Mock the API responses
mock.onGet("/api/values/current").reply(200, { 1: "1", 2: "1" });
mock.onGet("/api/values/all").reply(200, [{ number: 1 }, { number: 2 }]);
mock.onPost("/api/values").reply(200, {});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("renders Home link and navigates to Fib component", async () => {
  await act(async () => {
    ReactDOM.createRoot(container).render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Fib />} />
        </Routes>
      </MemoryRouter>
    );
  });

  // Wait for the API responses to be processed
  await screen.findByText(/indexes i have seen/i);
  await screen.findByText(/calculated values/i);

  expect(screen.getByText(/indexes i have seen/i)).toBeInTheDocument();
  expect(screen.getByText(/calculated values/i)).toBeInTheDocument();
});

test("renders Other Page link and navigates to OtherPage component", async () => {
  await act(async () => {
    ReactDOM.createRoot(container).render(
      <MemoryRouter initialEntries={["/otherpage"]}>
        <Routes>
          <Route path="/otherpage" element={<OtherPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  expect(screen.getByText(/Im some other page/i)).toBeInTheDocument();
});

test("renders Learn React link with correct href", async () => {
  await act(async () => {
    ReactDOM.createRoot(container).render(<App />);
  });

  const learnReactLink = screen.getByText(/learn react/i);
  expect(learnReactLink).toBeInTheDocument();
  expect(learnReactLink).toHaveAttribute("href", "https://reactjs.org");
  expect(learnReactLink).toHaveAttribute("target", "_blank");
  expect(learnReactLink).toHaveAttribute("rel", "noopener noreferrer");
});
