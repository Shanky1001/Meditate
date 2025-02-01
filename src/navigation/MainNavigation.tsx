import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerParamList, MainStackParamList} from "../../types";
import Screens from "../constants/Screens";
import Setting from "../screens/settings/Setting";
import Profile from "../screens/profile/Profile";
import Support from "../screens/support/Support";
import DrawerView from "../components/drawer/DrawerView";

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Screens.Root.Drawer.index}>
      <Stack.Screen name={Screens.Root.Drawer.index} component={DrawerNavigation} />
      <Stack.Screen name={Screens.Root.Profile} component={Profile} />
      <Stack.Screen name={Screens.Root.Setting} component={Setting} />
      <Stack.Screen name={Screens.Root.Support} component={Support} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerView {...props} />}>
      <Drawer.Screen name={Screens.Root.Drawer.BottomNavigation.index} component={BottomNavigation} />
    </Drawer.Navigator>
  );
}
