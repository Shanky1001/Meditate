import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Main">
      <Stack.Screen name="Main" component={BottomNavigation} />
    </Stack.Navigator>
  );
}
