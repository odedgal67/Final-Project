import * as React from "react";

import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

type ClickableIconProps = {
  onClick?: () => void;
  imagePath: ImageSourcePropType;
  width: string | number | undefined;
  height: string | number | undefined;
  testID: string;
};

const ClickableIcon = (props: ClickableIconProps) => (
  <TouchableOpacity onPress={props.onClick} testID={props.testID}>
    <Image
      source={props.imagePath}
      style={{
        width: props.width,
        height: props.height,
      }}
    />
  </TouchableOpacity>
);

export default ClickableIcon;
