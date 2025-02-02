import React from "react";
import {Alert, Image, Pressable, StyleSheet, View} from "react-native";
import ScreenWrapper from "../ScreenWrapper";
import {List} from "react-native-paper";
import {StackNavigationProp} from "@react-navigation/stack";
import {SettingParamList} from "../../../types";
import {useDispatch} from "react-redux";
import {clearData} from "../../redux/slices/meditationSlice";
import {Logo} from "../../../assets";
import {ThemedText, ThemedView} from "../../theme/Themed";
import {openUrl} from "../../utils";

interface SettingProps {
  navigation: StackNavigationProp<SettingParamList, "Setting">;
}
export default function Setting({navigation}: SettingProps) {
  const dispatch = useDispatch();
  const resetData = () => {
    Alert.alert("Clear Data", "Are you sure you want to delete your data? All your stats will be reset. This cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear Data",
        onPress: () => dispatch(clearData()),
        style: "destructive",
      },
    ]);
  };
  const openAboutUs = () => {
    openUrl("https://github.com/Shanky1001");
  };
  const Title = () => {
    return (
      <Pressable onPress={openAboutUs}>
        <ThemedView>
          <ThemedText style={styles.titleText}>Developed with ❤️ by Shashank Rai</ThemedText>
        </ThemedView>
      </Pressable>
    );
  };
  return (
    <ScreenWrapper scroll>
      <Image source={Logo} style={styles.logo} />
      <List.Section title="Settings" style={styles.section}>
        <List.Item title="Clear Data" onPress={resetData} style={styles.item} />
        <List.Section title="About Us">
          <List.Item title={Title} style={styles.item} />
        </List.Section>
      </List.Section>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  section: {
    marginTop: 30,
  },
  item: {
    paddingLeft: 10,
  },
});
