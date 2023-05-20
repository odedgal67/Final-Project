import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import Drawer from "react-native-drawer";

interface Props {
  children: React.ReactNode;
}

interface VisibilityState {
  currentVisibility: boolean;
  setCurrentVisibility: (visibility: boolean) => void;
  getCurrentVisibility: () => boolean;
}

const visibilityState: VisibilityState = {
  currentVisibility: false,
  setCurrentVisibility: (visibility: boolean) => {
    visibilityState.currentVisibility = visibility;
  },
  getCurrentVisibility: () => {
    return visibilityState.currentVisibility;
  },
};

export const DrawerMenuVisibleContext =
  React.createContext<VisibilityState>(visibilityState);

const DrawerMenu: React.FC<Props> = ({ children }) => {
  const currentVisibility = useContext(DrawerMenuVisibleContext);
  return (
    <DrawerMenuVisibleContext.Consumer>
      {(currentVisibility) => (
        <Drawer
          content={<View style={{ flex: 1, backgroundColor: "red" }}></View>}
          open={currentVisibility.getCurrentVisibility()}
        >
          {children}
        </Drawer>
      )}
    </DrawerMenuVisibleContext.Consumer>
  );
};

export default DrawerMenu;
