import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import {StyleProp, ViewStyle} from "react-native";

type MIconProps = {
  name: React.ComponentProps<typeof Icon>["name"];
  family: "MaterialIcons" | "FontAwesome" | "FontAwesome5";
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function MIcon({name, family, size = 25, ...rest}: MIconProps) {
  if (family === "FontAwesome") return <FontAwesomeIcon size={size} name={name} {...rest} />;
  if (family === "FontAwesome5") return <FontAwesome5Icon size={size} name={name} {...rest} />;
  return <MaterialIcon size={size} name={name} {...rest} />;
}
