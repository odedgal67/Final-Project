// CounterContext.tsx
import React from "react";
import { Stage } from "../types";

// Declaring the state object globally.
const StageState = {
  stage: {} as Stage,
};

const StageContextWrapper = (component?: React.Component) => ({
  ...StageState,
  setStage: (stage: Stage) => {
    StageState.stage = stage;
    component?.setState({ context: StageContextWrapper(component) });
  },
  getStage: () => {
    return StageState.stage;
  },
});

type Context = ReturnType<typeof StageContextWrapper>;

export const StageContext = React.createContext<Context>(StageContextWrapper());

interface State {
  context: Context;
}

export class StageContextProvider extends React.Component {
  state: State = {
    context: StageContextWrapper(this),
  };

  render() {
    return (
      <StageContext.Provider value={this.state.context}>
        {this.props.children}
      </StageContext.Provider>
    );
  }
}
