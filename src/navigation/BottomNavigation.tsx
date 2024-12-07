import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Statistics from "../screens/stats/Statistics";
import Setting from "../screens/settings/Setting";
import Icon from "react-native-vector-icons/MaterialIcons";

const BottomTab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <BottomTab.Navigator initialRouteName="Home" screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={Statistics}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="calendar-month" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {name: React.ComponentProps<typeof Icon>["name"]; color: string}) {
  return <Icon size={25} style={styles.tabBarIcon} {...props} />;
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
