import { render, fireEvent } from "@testing-library/react-native";
import { Status, Title } from "../../types";
import StatusRectangle from "../StatusRectangle";
import React from "react";

describe("StatusRectangle component", () => {
  const onChange = jest.fn();
  const props = {
    status: Status.Open,
    borderRad: 10,
    width: 150,
    height: 50,
    border: true,
    onChange,
    activated: true,
  };

  it("should render correctly", () => {
    const { getByTestId, getByText, getByRole } = render(
      <StatusRectangle {...props} />
    );

    expect(getByTestId("status-rectangle")).toBeDefined();
  });

  it("should open modal on press", () => {
    const { getByTestId, getByText } = render(<StatusRectangle {...props} />);
    const button = getByTestId("status-rectangle-button");
    fireEvent.press(button);

    expect(getByTestId(String(Status.Open))).toBeDefined();
    expect(getByTestId(String(Status.InProgress))).toBeDefined();
    expect(getByTestId(String(Status.Done))).toBeDefined();
    expect(getByTestId(String(Status.Invalid))).toBeDefined();
  });

  it("should call onChange function with selected status", () => {
    const { getByText, getByTestId } = render(<StatusRectangle {...props} />);
    const button = getByTestId("status-rectangle-button");
    fireEvent.press(button);

    const inProgressButton = getByTestId(String(Status.InProgress));
    fireEvent.press(inProgressButton);

    expect(onChange).toHaveBeenCalledWith(Status.InProgress);
  });
});
