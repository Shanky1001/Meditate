import {StatusBar, StyleSheet, Text, View} from "react-native";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./RootNavigation";

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar translucent />
      <RootNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
