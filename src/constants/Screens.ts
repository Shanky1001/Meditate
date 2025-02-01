const Screens = {
  OnBoarding: "OnBoarding",
  Root: {
    index: "Root",
    Profile: "Profile",
    Setting: "Setting",
    Support: "Support",
    Drawer: {
      index: "Drawer",
      BottomNavigation: {
        index: "BottomNavigation",
        Home: {
          index: "Home",
          HomeScreen: "HomeScreen",
          PlayScreen: "PlayScreen",
        },
        Stats: "Stats",
        Setting: "Setting",
      },
    },
  },
  NotFound: "NotFound",
} as const;

export default Screens;
export type DRAWER_MENU_TYPE = {
  id: string;
  label: string;
  icon?: React.ReactElement;
  screen?: string;
};
export const DRAWER_MENU: DRAWER_MENU_TYPE[] = [
  {id: "1", label: "Profile", screen: Screens.Root.Profile},
  {id: "2", label: "Setting", screen: Screens.Root.Setting},
  {id: "3", label: "Support", screen: Screens.Root.Support},
  {id: "4", label: ""},
];
