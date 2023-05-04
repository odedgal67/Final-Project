// CounterContext.tsx
import React from "react";
import { User } from "../types";

// Declaring the state object globally.
const UserState = {
  user: { name: "guest", id: "-1" },
  api_answer: 0,
};

const UserContextWrapper = (component?: React.Component) => ({
  ...UserState,
  setUser: (user: User) => {
    UserState.user = user;
    component?.setState({ context: UserContextWrapper(component) });
  },
  getUser: () => {
    return UserState.user;
  },
  notify: () => {
    UserState.api_answer++;
    component?.setState({ context: UserContextWrapper(component) });
  },
});

type Context = ReturnType<typeof UserContextWrapper>;

export const UserContext = React.createContext<Context>(UserContextWrapper());

interface State {
  context: Context;
}

export class UserContextProvider extends React.Component {
  state: State = {
    context: UserContextWrapper(this),
  };

  render() {
    return (
      <UserContext.Provider value={this.state.context}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}