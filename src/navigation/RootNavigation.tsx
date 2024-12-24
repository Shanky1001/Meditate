import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import NotFound from "../screens/notFound/NotFound";
import HomeNavigation from "./HomeNavigation";
import OnBoarding from "../screens/onboarding/OnBoarding";

const Stack = createStackNavigator();
export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnBoarding} />
      <Stack.Screen name="Root" component={HomeNavigation} />
      <Stack.Screen name="notFound" component={NotFound} options={{title: "Oops!"}} />
    </Stack.Navigator>
  );
}
