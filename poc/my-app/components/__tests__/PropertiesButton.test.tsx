import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PropertiesButton from "../PropertiesButton";

describe("PropertiesButton", () => {
  it("should render the correct title text", () => {
    const title = "Test Button";
    const onPress = jest.fn();
    const { getByText } = render(
      <PropertiesButton title={title} onPress={onPress} />
    );
    expect(getByText(title)).not.toBeNull();
  });

  it("should call onPress when the button is pressed", () => {
    const title = "Test Button";
    const onPress = jest.fn();
    const { getByText } = render(
      <PropertiesButton title={title} onPress={onPress} />
    );
    fireEvent.press(getByText(title));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
