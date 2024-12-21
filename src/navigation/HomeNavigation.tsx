import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {Text, View} from "react-native";

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
      <View style={{flex: 1, height: 80}}>
        <Text style={{}}>hello</Text>
      </View>
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
