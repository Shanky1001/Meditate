import {StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./RootNavigation";
import SplashScreen from "../screens/splash/Splash";
import {useColorScheme} from "../hooks/useColorScheme";
import {useQuote} from "../hooks/useQuote";
import {useDispatch} from "react-redux";
import {updateTodayQuote} from "../redux/slices/meditationSlice";

export default function Navigation() {
  const [theme, setTheme] = useState(DefaultTheme);
  const {activeTheme, isLoading: themeLoading} = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const {quote, author} = useQuote();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTodayQuote({quote, author}));
  }, []);

  useEffect(() => {
    setTheme(activeTheme === "dark" ? DarkTheme : DefaultTheme);
  }, [activeTheme]);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  if (isLoading || themeLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
