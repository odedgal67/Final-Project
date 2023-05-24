import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Status, Title } from "../../types";
import StatusRectangle from "../StatusRectangle";

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

    expect(getByTestId(Status.Open)).toBeDefined();
    expect(getByTestId(Status.InProgress)).toBeDefined();
    expect(getByTestId(Status.Done)).toBeDefined();
    expect(getByTestId(Status.Invalid)).toBeDefined();
  });

  it("should call onChange function with selected status", () => {
    const { getByText, getByTestId } = render(<StatusRectangle {...props} />);
    const button = getByTestId("status-rectangle-button");
    fireEvent.press(button);

    const inProgressButton = getByTestId(Status.InProgress);
    fireEvent.press(inProgressButton);

    expect(onChange).toHaveBeenCalledWith(Status.InProgress);
  });
});
