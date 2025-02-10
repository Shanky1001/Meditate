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

export const memoize = (cb: (data: unknown) => unknown) => {
  const cache: {
    [key: string]: unknown;
  } = {};
  return (data: unknown) => {
    const cacheKey = JSON.stringify(data);
    if (cache[cacheKey]) {
      console.log("from cache");
      return cache[cacheKey];
    }
    const value = cb(data);
    cache[cacheKey] = value;
    return value;
  };
};

// Format seconds to mm:ss
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
