import {StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./RootNavigation";
import useColorScheme from "../hooks/useColorScheme";

export default function Navigation() {
  const [theme, setTheme] = useState(DefaultTheme);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTheme(colorScheme === "dark" ? DarkTheme : DefaultTheme);
  }, [useColorScheme]);
  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
