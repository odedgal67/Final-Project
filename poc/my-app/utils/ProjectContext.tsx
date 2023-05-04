// CounterContext.tsx
import React from "react";
import { Project } from "../types";

// Declaring the state object globally.
const ProjectState = {
  project: { name: "", id: 0 },
  api_answer: 0,
};

const ProjectContextWrapper = (component?: React.Component) => ({
  ...ProjectState,
  setProject: (project: Project) => {
    ProjectState.project = project;
    component?.setState({ context: ProjectContextWrapper(component) });
  },
  getProject: () => {
    return ProjectState.project;
  },
  notify: () => {
    ProjectState.api_answer++;
    console.log("project context wrapper notified");
    component?.setState({ context: ProjectContextWrapper(component) });
  },
});

type Context = ReturnType<typeof ProjectContextWrapper>;

export const ProjectContext = React.createContext<Context>(
  ProjectContextWrapper()
);

interface State {
  context: Context;
}

export class ProjectContextProvider extends React.Component {
  state: State = {
    context: ProjectContextWrapper(this),
  };

  render() {
    return (
      <ProjectContext.Provider value={this.state.context}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
