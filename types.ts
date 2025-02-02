import Screens from "./src/constants/Screens";

export type NO_PARAMS = undefined;
export type RootStackParamList = {
  [Screens.OnBoarding]: NO_PARAMS;
  [Screens.Root.index]: NO_PARAMS;
  [Screens.NotFound]: NO_PARAMS;
};

export type MainStackParamList = {
  [Screens.Root.Profile]: NO_PARAMS;
  [Screens.Root.Setting]: NO_PARAMS;
  [Screens.Root.Support]: NO_PARAMS;
  [Screens.Root.Drawer.index]: NO_PARAMS;
};

export type DrawerParamList = {
  [Screens.Root.Drawer.BottomNavigation.index]: NO_PARAMS;
};

export type BottomTabParamList = {
  [Screens.Root.Drawer.BottomNavigation.Home.index]: NO_PARAMS;
  [Screens.Root.Drawer.BottomNavigation.Stats]: NO_PARAMS;
  [Screens.Root.Drawer.BottomNavigation.Setting.index]: NO_PARAMS;
};

export type HomeParamList = {
  [Screens.Root.Drawer.BottomNavigation.Home.HomeScreen]: NO_PARAMS;
  [Screens.Root.Drawer.BottomNavigation.Home.PlayScreen]: {
    id: string;
  };
};

export type SettingParamList = {
  [Screens.Root.Drawer.BottomNavigation.Setting.index]: NO_PARAMS;
  [Screens.Root.Drawer.BottomNavigation.Setting.AboutUS]: NO_PARAMS;
};
