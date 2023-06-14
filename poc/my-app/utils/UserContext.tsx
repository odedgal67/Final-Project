// CounterContext.tsx
import React from "react";
import { User } from "../types";
import { roles } from "./Permissions";

// Declaring the state object globally.
const temp_user = { name: "guest", id: "-1" };
const UserState = {
  user: { name: "guest", id: "123456789" },
  api_answer: 0,
  role: roles.UNDEFINED,
  last_used_password: "",
};

export const UserContextWrapper = (component?: React.Component) => ({
  ...UserState,
  setUser: (user: User) => {
    UserState.user = user;
    component?.setState({ context: UserContextWrapper(component) });
  },
  setLastUsedPassword: (password: string) => {
    UserState.last_used_password = password;
  },
  getLatestPassword: () => {
    return UserState.last_used_password;
  },
  getUser: () => {
    return UserState.user;
  },
  notify: () => {
    UserState.api_answer++;
    component?.setState({ context: UserContextWrapper(component) });
  },
  clearUserState: () => {
    UserState.user = temp_user;
    UserState.last_used_password = "";
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
