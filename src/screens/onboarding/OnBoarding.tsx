import {Text, ImageBackground, StyleSheet} from "react-native";
import React from "react";
import MButton from "../../components/MButton";
import {ThemedView} from "../../theme/Themed";

const OnBoarding = ({navigation: {navigate}}: any) => {
  //   const {height} = Dimensions.get("window");

  const handlePress = () => navigate("Home");
  return (
    <ImageBackground source={require("../assets/images/onboarding.jpeg")} style={styles.bgImage}>
      <ThemedView>
        <Text style={styles.txt}>Stay health even if you stay at home</Text>
        <Text style={styles.txt}>Staying fit to keep you in good condition can now go through mobile apps</Text>
        <MButton onPress={handlePress}>Get Started</MButton>
      </ThemedView>
    </ImageBackground>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  txt: {
    textAlign: "center",
  },
});
