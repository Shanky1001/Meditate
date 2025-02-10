import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {BottomTabHeaderProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Statistics from "../screens/stats/Statistics";
import Setting from "../screens/settings/Setting";
import {DrawerActions} from "@react-navigation/native";
import {ThemedText, ThemedView, useThemeColor} from "../theme/Themed";
import Colors from "../constants/Colors";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomTabParamList, HomeParamList, SettingParamList} from "../../types";
import HomeScreen from "../screens/home/HomeScreen";
import PlayScreen from "../screens/home/PlayScreen";
import Screens from "../constants/Screens";
import ContextProvider from "../Providers/ContextProvider";
import MIcon from "../components/common/MIcon";

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
          // headerShown: false,
          tabBarIcon: ({color}) => <MIcon family="MaterialIcons" name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={Screens.Root.Drawer.BottomNavigation.Stats}
        component={Statistics}
        options={{
          tabBarIcon: ({color}) => <MIcon family="MaterialIcons" name="calendar-month" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={Screens.Root.Drawer.BottomNavigation.Setting.index}
        component={Setting}
        options={{
          tabBarIcon: ({color}) => <MIcon family="MaterialIcons" name="settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
function CustomHeader({navigation}: BottomTabHeaderProps) {
  const onClick = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const IconColor = useThemeColor({}, "gray900");
  return (
    <ThemedView style={styles.headerContainer}>
      <TouchableOpacity onPress={onClick}>
        <MIcon family="MaterialIcons" name="menu" color={IconColor} />
      </TouchableOpacity>
      <ThemedText darkColor={IconColor} lightColor={IconColor} style={styles.headerText}>
        Meditate
      </ThemedText>
    </ThemedView>
  );
}

const HomeScreens = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <ContextProvider>
      <HomeScreens.Navigator>
        <HomeScreens.Group>
          <HomeScreens.Screen name={Screens.Root.Drawer.BottomNavigation.Home.HomeScreen} component={HomeScreen} options={{headerShown: false}} />
          <HomeScreens.Screen
            name={Screens.Root.Drawer.BottomNavigation.Home.PlayScreen}
            component={PlayScreen}
            options={{
              headerShown: true,
              gestureEnabled: true,
              animation: "fade",
              animationTypeForReplace: "pop",
            }}
          />
        </HomeScreens.Group>
      </HomeScreens.Navigator>
    </ContextProvider>
  );
};

const SettingScreens = createStackNavigator<SettingParamList>();
const SettingNavigator = () => {
  return (
    <SettingScreens.Navigator screenOptions={{headerShown: false}}>
      <SettingScreens.Screen name={Screens.Root.Drawer.BottomNavigation.Setting.index} component={Setting} />
      {/* <SettingScreens.Screen name={Screens.Root.Drawer.BottomNavigation.Setting.AboutUS} component={AboutUs} /> */}
    </SettingScreens.Navigator>
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
