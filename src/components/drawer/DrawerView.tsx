import {Pressable, StyleSheet, View} from "react-native";
import React from "react";
import {DrawerContentComponentProps, DrawerContentScrollView} from "@react-navigation/drawer";
import {ThemedText, ThemedView, useThemeColor} from "../../theme/Themed";
import {DRAWER_MENU, DRAWER_MENU_TYPE} from "../../constants/Screens";
import {useNavigation} from "@react-navigation/native";
import MAvatar from "../common/MAvatar";
import MButton from "../common/MButton";
import {getDimensions} from "../../utils";

export default function DrawerView(props: DrawerContentComponentProps) {
  const color = useThemeColor({}, "white");
  const UserName = "Shashank Rai";
  const handleLogout = () => {
    console.log("Logout");
  };
  return (
    <View style={[style.drawerContainer, {backgroundColor: color}]}>
      <DrawerContentScrollView>
        <View style={style.userInfo}>
          <MAvatar label={UserName} size={50} />
          <ThemedText style={style.userName}>{UserName}</ThemedText>
        </View>
        <ThemedView>
          {DRAWER_MENU.map((menu, index) => (
            <DrawerMenuCard menu={menu} key={index} />
          ))}
        </ThemedView>
      </DrawerContentScrollView>
      <MButton style={style.logoutBtn} variant="capsule" onPress={handleLogout}>
        <ThemedText style={{color}}>{UserName ? "Logout" : "Login"}</ThemedText>
      </MButton>
    </View>
  );
}

const style = StyleSheet.create({
  drawerContainer: {
    position: "relative",
    height: getDimensions().height,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 15,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuCard: {
    marginVertical: 5,
    padding: 10,
  },
  menuItem: {
    fontSize: 18,
  },
  logoutBtn: {
    position: "absolute",
    bottom: 20,
    width: "40%",
    marginLeft: 20,
  },
});

const DrawerMenuCard = (props: {menu: DRAWER_MENU_TYPE}) => {
  const {menu} = props;

  const navigate = useNavigation();
  const handlePress = () => {
    if (menu.screen) navigate.navigate(menu.screen as never);
  };
  if (!menu.label) return null;
  return (
    <View style={style.menuCard}>
      {menu.icon && <View>{menu.icon}</View>}
      <Pressable onPress={handlePress}>
        <ThemedText style={style.menuItem}>{menu.label}</ThemedText>
      </Pressable>
    </View>
  );
};
