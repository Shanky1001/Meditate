import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import NotFound from "../screens/notFound/NotFound";
import OnBoarding from "../screens/onboarding/OnBoarding";
import MainNavigation from "./MainNavigation";
import Screens from "../constants/Screens";
import {RootStackParamList} from "../../types";

const Stack = createStackNavigator<RootStackParamList>();
export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.OnBoarding} component={OnBoarding} />
      <Stack.Screen name={Screens.Root.index} component={MainNavigation} />
      <Stack.Screen name={Screens.NotFound} component={NotFound} options={{title: "Oops!"}} />
    </Stack.Navigator>
  );
}
