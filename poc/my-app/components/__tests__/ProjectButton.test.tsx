import React from "react";
import { fireEvent, render } from '@testing-library/react-native';
import ProjectButton from "../ProjectButton";

describe('ProjectButton', () => {
  test('renders correctly', async () => {
    const project = {
      id: '1',
      name: 'Project 1',
    };

    const renameProject = jest.fn();

    const { getByText, getByTestId } = render(
      <ProjectButton
        project={project}
        projectName={project.name}
        onPress={jest.fn()}
        renameProject={renameProject}
      />
    );

    const textElement = getByText(project.name);
    expect(textElement).toBeDefined();
    fireEvent(getByTestId('projectButton'), 'longPress');
    fireEvent.changeText(getByTestId('projectNameInput'), 'New Project Name');
    fireEvent.press(getByTestId('acceptButton'),);
    expect(renameProject).toHaveBeenCalledWith(project.id, 'New Project Name');
  });
});
