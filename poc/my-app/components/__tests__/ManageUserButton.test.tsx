import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ManageUserButton from "../ManageUserButton";
import { roles, actions } from "../../utils/Permissions";
import { role_to_hebrew } from "../../utils/text_dictionary";

describe("ManageUserButton", () => {
  const user = {
    id: "123456789",
    name: "John Doe",
  };

  const onRemoveMock = jest.fn();
  const onChangeRoleMock = jest.fn();

  it("should render correctly", () => {
    const { getByText } = render(
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
    const { getByText } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const button = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    fireEvent.press(button);

    const removeButton = getByText("Remove");
    expect(removeButton).toBeDefined();

    const changeRoleButton = getByText("Change Role");
    expect(changeRoleButton).toBeDefined();
  });

  it("should call onRemove function when remove button is pressed", () => {
    const { getByText } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const button = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    fireEvent.press(button);

    const removeButton = getByText("Remove");
    fireEvent.press(removeButton);

    expect(onRemoveMock).toHaveBeenCalledWith(user);
  });

  it("should call onChangeRole function when change role button is pressed", () => {
    const { getByText } = render(
      <ManageUserButton
        navigation={null}
        user={user}
        onRemove={onRemoveMock}
        role={roles.PROJECT_MANAGER}
      />
    );

    const button = getByText(role_to_hebrew[roles.PROJECT_MANAGER]);
    fireEvent.press(button);

    const changeRoleButton = getByText("Change Role");
    fireEvent.press(changeRoleButton);

    expect(onChangeRoleMock).toHaveBeenCalled();
  });
});
