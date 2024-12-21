import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {BottomTabHeaderProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Statistics from "../screens/stats/Statistics";
import Setting from "../screens/settings/Setting";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DrawerActions} from "@react-navigation/native";
import {useTheme} from "react-native-paper";

const BottomTab = createBottomTabNavigator();
export default function BottomNavigation() {
  const renderHeader = (props: BottomTabHeaderProps) => <CustomHeader {...props} />;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: renderHeader,
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarShowLabel: false,
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
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClick}>
        <TabBarIcon name="menu" color="#FFFFFF" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A6D92",
    gap: 8,
    paddingLeft: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
