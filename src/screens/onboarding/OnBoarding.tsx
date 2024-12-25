import {ImageBackground, StyleSheet, View} from "react-native";
import React from "react";
import MButton from "../../components/MButton";
import {ThemedText, ThemedView} from "../../theme/Themed";
import {OnboardingImage} from "../../../assets";
import Colors from "../../constants/Colors";
import Screens from "../../constants/Screens";

const OnBoarding = ({navigation: {navigate}}: any) => {
  const handlePress = () => navigate(Screens.Root);
  return (
    <ImageBackground source={OnboardingImage} resizeMode="cover" style={styles.bgImage}>
      <ThemedView style={styles.container}>
        <View>
          <ThemedText style={styles.txt}>Stay healthy even if you stay at home</ThemedText>
          <ThemedText style={styles.txt}>Staying fit to keep you in good condition can now be as easy as going through mobile apps</ThemedText>
        </View>
        <MButton onPress={handlePress}>
          <ThemedText lightColor={Colors.light.gray100} darkColor={Colors.dark.gray900}>
            Get Started
          </ThemedText>
        </MButton>
      </ThemedView>
    </ImageBackground>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  container: {
    backgroundColor: "transparent",
    position: "absolute",
    width: "80%",
    margin: "auto",
    top: "90%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: 26,
  },
  txt: {
    textAlign: "center",
    color: Colors.light.gray100,
    fontSize: 16,
  },
});
