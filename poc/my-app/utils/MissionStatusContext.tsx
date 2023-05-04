// CounterContext.tsx
import React from "react";
import { Status } from "../types";
import API from "../API/api_bridge";

// Declaring the state object globally.
const StatusState = {
  status: {} as Status,
};

const StatusContextWrapper = (component?: React.Component) => ({
  ...StatusState,
  _setStatus: (new_status: Status) => {
    StatusState.status = new_status;
    component?.setState({ context: StatusContextWrapper(component) });
  },
  setStatus: (
    project_id: number,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ) => {
    API.get_instance().set_mission_status(
      project_id,
      stage_id,
      mission_id,
      new_status,
      username
    );
    StatusState.status = new_status;
    component?.setState({ context: StatusContextWrapper(component) });
  },
  getStatus: () => {
    return StatusState.status;
  },
});

type Context = ReturnType<typeof StatusContextWrapper>;

export const MissionStatusContext = React.createContext<Context>(
  StatusContextWrapper()
);

interface State {
  context: Context;
}

export class MissionStatusContextProvider extends React.Component {
  state: State = {
    context: StatusContextWrapper(this),
  };

  render() {
    return (
      <MissionStatusContext.Provider value={this.state.context}>
        {this.props.children}
      </MissionStatusContext.Provider>
    );
  }
}
