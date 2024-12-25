import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {ThemedText} from "../theme/Themed";
import {DrawerParamList, MainStackParamList} from "../../types";
import Screens from "../constants/Screens";

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={Screens.Root.Drawer.index}>
      <Stack.Screen name={Screens.Root.Drawer.index} component={DrawerNavigation} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigation() {
  const renderDrawer = () => (
    <DrawerContentScrollView>
      <ThemedText>Hello</ThemedText>
    </DrawerContentScrollView>
  );
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={renderDrawer}>
      <Drawer.Screen name={Screens.Root.Drawer.BottomNavigation.index} component={BottomNavigation} />
    </Drawer.Navigator>
  );
}
