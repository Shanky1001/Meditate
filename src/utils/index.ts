import {Dimensions} from "react-native";

export const getDimensions = () => {
  const {height, width} = Dimensions.get("window");
  return {height, width};
};
