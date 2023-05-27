// CounterContext.tsx
import React from "react";
import { Project } from "../types";
import { roles } from "./Permissions";

// Declaring the state object globally.
const ProjectState = {
  project: { name: "", id: -1 },
  role: "",
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
  setRole: (role: roles) => {
    ProjectState.role = role;
    component?.setState({ context: ProjectContextWrapper(component) });
  },
  getRole: () => {
    return ProjectState.role;
  },
  clearProjectState: () => {
    ProjectState.project = { name: "", id: 0 };
    ProjectState.role = "";
    ProjectState.api_answer = 0;
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
