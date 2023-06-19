import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ManageUserButton from "../ManageUserButton";
import { roles, actions } from "../../utils/Permissions";
import { hebrew, role_to_hebrew } from "../../utils/text_dictionary";
import { Alert } from "react-native";
import API from "../../API/api_bridge";

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("ManageUserButton", () => {
  const user = {
    id: "123456789",
    name: "John Doe",
  };

  const onRemoveMock = jest.fn();
  const onChangeRoleMock = jest.fn(API.get_instance().edit_user_role);
  jest.spyOn(API.get_instance(), "edit_user_role").mockImplementation(onChangeRoleMock)

  it("should render correctly", () => {
    const { getByText, getByTestId } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const nameText = getByText("John Doe");
    expect(nameText).toBeDefined();

    const roleText = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    expect(roleText).toBeDefined();
  });

  it("should show options on press", () => {
    const { getByText, getByTestId } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const button = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    fireEvent.press(button);

    const removeButton = getByTestId("remove_user_button");
    expect(removeButton).toBeDefined();

    const changeRoleButton = getByText(hebrew.change_role);
    expect(changeRoleButton).toBeDefined();
  });

  it("should call onRemove function when remove button is pressed", () => {
    const { getByText, getByTestId } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const button = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    fireEvent.press(button);

    const removeButton = getByTestId("remove_user_button");
    fireEvent.press(removeButton);

    const acceptButtonPress = (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress;
    acceptButtonPress();

    expect(onRemoveMock).toHaveBeenCalled();
  });

  it("should call onChangeRole function when change role button is pressed", () => {
    const { getByText, getByTestId, } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    fireEvent.press(getByText("John Doe"));

    const button = getByText(hebrew.change_role);
    fireEvent.press(button);

    const roleButton = getByText(role_to_hebrew[roles.CONTRACTOR]);
    fireEvent.press(roleButton);

    expect(onChangeRoleMock).toHaveBeenCalled();
  });
});
