import {StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import React, {ReactNode} from "react";
import {ThemedText, useThemeColor} from "../../theme/Themed";

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  variant?: "contained" | "text" | "capsule";
  disabled?: boolean;
  onPress?: () => void;
}

const MButton: React.FC<Props> = ({style, children, textStyle, variant = "contained", disabled, onPress}) => {
  const bgColor = useThemeColor({}, "purple900");
  const getButtonStyle = () => {
    switch (variant) {
      case "contained":
        return {
          backgroundColor: disabled ? "#CCCCCC" : bgColor,
          ...styles.btn,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          ...styles.btn,
        };
      case "capsule":
        return {
          backgroundColor: disabled ? "#CCCCCC" : bgColor,
          ...styles.btn,
          ...styles.capsule,
        };
    }
  };
  const getTextStyle = () => {
    switch (variant) {
      case "contained":
      case "capsule":
        return {
          color: disabled ? "#666666" : "#FFFFFF",
        };
      case "text":
        return {
          color: disabled ? "#666666" : bgColor,
        };
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={[getButtonStyle(), style]}>
      <ThemedText style={[getTextStyle(), textStyle]}>{children}</ThemedText>
    </TouchableOpacity>
  );
};

export default MButton;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    paddingInline: 16,
    paddingBlock: 8,
    borderRadius: 5,
  },
  capsule: {
    borderRadius: 50,
  },
});
