import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {ThemedText, ThemedView} from "../theme/Themed";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="bottomNavigation" component={BottomNavigation} />
    </Drawer.Navigator>
  );
}
