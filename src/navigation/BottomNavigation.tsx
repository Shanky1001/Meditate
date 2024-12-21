import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {BottomTabHeaderProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Statistics from "../screens/stats/Statistics";
import Setting from "../screens/settings/Setting";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DrawerActions} from "@react-navigation/native";
import {ThemedText, ThemedView, useThemeColor} from "../theme/Themed";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
export default function BottomNavigation() {
  const renderHeader = (props: BottomTabHeaderProps) => <CustomHeader {...props} />;
  const activeColor = useThemeColor({}, "purple500");
  const inactiveColor = useThemeColor({}, "primary");
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: renderHeader,
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}>
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
  return <Icon size={25} {...props} />;
}

function CustomHeader({navigation}: BottomTabHeaderProps) {
  const onClick = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <ThemedView style={styles.headerContainer}>
      <TouchableOpacity onPress={onClick}>
        <TabBarIcon name="menu" color={Colors.light.gray900} />
      </TouchableOpacity>
      <ThemedText style={styles.headerText}>Hello</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    gap: 8,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 18,
  },
});
