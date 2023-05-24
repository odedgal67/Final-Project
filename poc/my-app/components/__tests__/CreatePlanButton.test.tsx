import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CreatePlanButton from "../CreatePlanButton";
import { hebrew } from "../../utils/text_dictionary";

describe("CreatePlanButton", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <CreatePlanButton
        onAddClick={function (
          planName: string,
          link: string,
          modal_visibility_setter: (b: boolean) => void
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const addNewPlanText = getByText(hebrew.add_new_plan);
    expect(addNewPlanText).toBeDefined();
  });

  it("should close modal on accept button press", () => {
    const onAddClick = jest.fn();
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <CreatePlanButton onAddClick={onAddClick} />
    );
    const addButton = getByTestId("addButton");
    fireEvent.press(addButton);
    const acceptButton = getByText(hebrew.accept);
    const planNameInput = getByPlaceholderText(
      hebrew.add_new_plan_place_holder
    );
    const linkInput = getByPlaceholderText(
      hebrew.add_new_plan_link_place_holder
    );
    const closeButton = getByTestId("closeButton");
    fireEvent.changeText(planNameInput, "test plan");
    fireEvent.changeText(linkInput, "test link");
    fireEvent.press(acceptButton);
    expect(onAddClick).toHaveBeenCalledWith(
      "test plan",
      "test link",
      expect.any(Function)
    );
    expect(closeButton).toBeDefined();
    fireEvent.press(closeButton);
    expect(() => getByText(hebrew.add_new_plan)).toThrow();
  });
});
