import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {BottomTabHeaderProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Statistics from "../screens/stats/Statistics";
import Setting from "../screens/settings/Setting";
import Icon from "react-native-vector-icons/MaterialIcons";
import {DrawerActions} from "@react-navigation/native";
import {ThemedText, ThemedView, useThemeColor} from "../theme/Themed";
import Colors from "../constants/Colors";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomTabParamList, HomeParamList} from "../../types";
import HomeScreen from "../screens/home/HomeScreen";
import PlayScreen from "../screens/home/PlayScreen";
import Screens from "../constants/Screens";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomNavigation() {
  const renderHeader = (props: BottomTabHeaderProps) => <CustomHeader {...props} />;
  const activeColor = useThemeColor({}, "purple500");
  const inactiveColor = useThemeColor({}, "primary");
  return (
    <BottomTab.Navigator
      initialRouteName={Screens.Root.Drawer.BottomNavigation.Home.index}
      screenOptions={{
        header: renderHeader,
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}>
      <BottomTab.Screen
        name={Screens.Root.Drawer.BottomNavigation.Home.index}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={Screens.Root.Drawer.BottomNavigation.Stats}
        component={Statistics}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="calendar-month" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={Screens.Root.Drawer.BottomNavigation.Setting}
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
      <ThemedText style={styles.headerText}>Meditate</ThemedText>
    </ThemedView>
  );
}

const HomeScreens = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <HomeScreens.Navigator screenOptions={{headerShown: false}}>
      <HomeScreens.Group>
        <HomeScreens.Screen name={Screens.Root.Drawer.BottomNavigation.Home.HomeScreen} component={HomeScreen} />
        <HomeScreens.Screen name={Screens.Root.Drawer.BottomNavigation.Home.PlayScreen} component={PlayScreen} />
      </HomeScreens.Group>
    </HomeScreens.Navigator>
  );
};

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
  headerTitle: {
    fontWeight: "600",
    color: Colors.light.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.primary,
  },
});
