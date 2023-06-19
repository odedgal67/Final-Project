import { Alert } from "react-native";
import ConfirmDialogue from "../ConfirmDialogue";
import { hebrew } from "../../utils/text_dictionary";

jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe("ConfirmDialogue", () => {
  const mockProps = {
    title: "Confirmation",
    message: "Are you sure?",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it("displays the confirmation dialog with the provided props", () => {
    ConfirmDialogue(mockProps);

    expect((Alert.alert as jest.Mock).mock.calls.length).toBe(1);
    expect((Alert.alert as jest.Mock).mock.calls[0][0]).toBe("Confirmation");
    expect((Alert.alert as jest.Mock).mock.calls[0][1]).toBe("Are you sure?");
    expect((Alert.alert as jest.Mock).mock.calls[0][2]).toEqual([
      {
        text: hebrew.accept,
        onPress: expect.any(Function),
      },
      {
        text: hebrew.decline,
        onPress: mockProps.onCancel,
      },
    ]);
  });

  it("calls the onConfirm function when accept button is pressed", () => {
    ConfirmDialogue(mockProps);

    const acceptButtonPress = (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress;
    acceptButtonPress();

    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});
