import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GetTextModal from "../GetTextModal";
import { hebrew } from "../../utils/text_dictionary";

describe("GetTextModal", () => {
  const mockProps = {
    visible: true,
    onRequestClose: jest.fn(),
    onChangeText: jest.fn(),
    onAccept: jest.fn(),
    boxTitle: "Enter Text",
  };

  it("renders correctly with the provided props", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <GetTextModal {...mockProps} />
    );

    const titleElement = getByText("Enter Text");
    const inputElement = getByPlaceholderText(hebrew.name);
    const acceptButtonElement = getByTestId("acceptButton")

    expect(titleElement).toBeDefined();
    expect(inputElement).toBeDefined();
    expect(acceptButtonElement).toBeDefined();
  });

  it("calls onChangeText when text input changes", () => {
    const { getByTestId } = render(<GetTextModal {...mockProps} />);

    const inputElement = getByTestId("Input");
    fireEvent.changeText(inputElement, "New Text");

    expect(mockProps.onChangeText).toHaveBeenCalledTimes(1);
    expect(mockProps.onChangeText).toHaveBeenCalledWith("New Text");
  });

  it("calls onAccept when accept button is pressed", () => {
    const { getByTestId } = render(<GetTextModal {...mockProps} />);

    const acceptButtonElement = getByTestId("acceptButton");
    fireEvent.press(acceptButtonElement);

    expect(mockProps.onAccept).toHaveBeenCalledTimes(1);
  });
});
