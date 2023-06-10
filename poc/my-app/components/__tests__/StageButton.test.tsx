import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StageButton from "../StageTableUtils/StageButton";

describe("StageButton", () => {
  it("renders button with correct text", () => {
    const stageName = "Stage 1";
    const onClickMock = jest.fn();
    const { getByText } = render(
      <StageButton stageName={stageName} onClick={onClickMock} />
    );

    const buttonElement = getByText(stageName);
    expect(buttonElement).toBeDefined();
  });

  it("calls onClick when button is pressed", () => {
    const stageName = "Stage 1";
    const onClickMock = jest.fn();
    const { getByText } = render(
      <StageButton stageName={stageName} onClick={onClickMock} />
    );

    const buttonElement = getByText(stageName);
    fireEvent.press(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
