import {Alert, Dimensions, Linking} from "react-native";
export const MS_PER_MINUTE = 60000;

export const getDimensions = () => {
  const {height, width} = Dimensions.get("window");
  return {height, width};
};

export const getMsInMinutes = (ms: number) => Math.floor(ms / MS_PER_MINUTE);

export const getPlural = (value: number, word: string) => (value > 1 ? `${word}s` : word);

export const openUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
