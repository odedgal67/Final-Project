import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StageButton } from "../TableUtils/StageButton";
import { Status } from "../../types";

describe("StageButton", () => {
  const stage = {
    name: "Stage 1",
    status: Status.InProgress,
    id: "1",
  };
  const onClickMock = jest.fn().mockResolvedValue('Success');;
  const onDeleteMock = jest.fn().mockResolvedValue('Success');;
  const onEditMock = jest.fn().mockResolvedValue('Success');
  it("renders button with correct text", () => {
    const { getByText } = render(
      <StageButton stage={stage} onClick={onClickMock} onDelete={onDeleteMock} onEditName={onEditMock} />
    );

    const buttonElement = getByText(stage.name);
    expect(buttonElement).toBeDefined();
  });

  it("calls onClick when button is pressed", () => {
    const { getByText } = render(
      <StageButton stage={stage} onClick={onClickMock} onDelete={onDeleteMock} onEditName={onEditMock} />
    );

    const buttonElement = getByText(stage.name);
    fireEvent.press(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("switches to editable mode on long press", () => {
    const { getByText, getByTestId } = render(
      <StageButton stage={stage} onClick={onClickMock} onDelete={onDeleteMock} onEditName={onEditMock} />
    );

    const buttonElement = getByText(stage.name);
    fireEvent(buttonElement, 'longPress');

    const editButtonElement = getByTestId("Edit");
    expect(editButtonElement).toBeDefined();
  });

  it("calls onEditName when edit button is pressed", () => {
    const { getByText, getByTestId } = render(
      <StageButton stage={stage} onClick={onClickMock} onDelete={onDeleteMock} onEditName={onEditMock} />
    );

    const buttonElement = getByText(stage.name);
    fireEvent(buttonElement, 'longPress');

    const editButtonElement = getByTestId("Edit");
    fireEvent.press(editButtonElement);
    fireEvent.changeText(getByTestId("Input"), "New Stage Name");
    fireEvent.press(getByTestId("acceptButton"));
    expect(onEditMock).toHaveBeenCalled();
  });

});
