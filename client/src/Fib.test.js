import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Fib from "./Fib";

jest.mock("axios");

test("fetches and displays data", async () => {
  const mockValuesResponse = { data: { 1: "1", 2: "1" } };
  const mockIndexesResponse = { data: [{ number: 1 }, { number: 2 }] };

  axios.get.mockImplementation((url) => {
    if (url === "/api/values/current") {
      return Promise.resolve(mockValuesResponse);
    } else if (url === "/api/values/all") {
      return Promise.resolve(mockIndexesResponse);
    }
    return Promise.reject(new Error("Not Found"));
  });

  await act(async () => {
    render(<Fib />);
  });

  // Wait for the API responses to be processed and state updates to complete
  await act(async () => {
    await screen.findByText("Indexes I have seen:");
    await screen.findByText("Calculated Values:");
  });

  expect(screen.getByText("Indexes I have seen:")).toBeInTheDocument();
  expect(screen.getByText("Calculated Values:")).toBeInTheDocument();

  // Add more assertions based on your rendered content
  expect(screen.getByText("1, 2")).toBeInTheDocument();
  expect(screen.getByText("For index 1 I calculated 1")).toBeInTheDocument();
  expect(screen.getByText("For index 2 I calculated 1")).toBeInTheDocument();
});

// Add more tests as needed
