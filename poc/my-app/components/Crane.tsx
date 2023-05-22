import * as React from "react";
import { HeaderButtonProps, useHeaderHeight } from "@react-navigation/elements";
import { HeaderButtons } from "react-navigation-header-buttons";

import { Image, TouchableOpacity } from "react-native";

const Crane = (props: { onClick: () => void } & HeaderButtonProps) => (
  <HeaderButtons>
    <TouchableOpacity onPress={props.onClick}>
      <Image
        source={require("./imgs/crane.gif")}
        style={{
          width: useHeaderHeight() / 2,
          height: useHeaderHeight() / 2,
        }}
      />
    </TouchableOpacity>
  </HeaderButtons>
);

export default Crane;
