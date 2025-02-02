import {StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./RootNavigation";
import useColorScheme from "../hooks/useColorScheme";
import SplashScreen from "../screens/splash/Splash";

export default function Navigation() {
  const [theme, setTheme] = useState(DefaultTheme);
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Show splash screen for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTheme(colorScheme === "dark" ? DarkTheme : DefaultTheme);
  }, [useColorScheme]);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
