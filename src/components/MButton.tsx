import {StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import React, {ReactNode} from "react";
import {ThemedText, useThemeColor} from "../theme/Themed";

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const MButton: React.FC<Props> = ({style, children, textStyle, onPress}) => {
  const bgColor = useThemeColor({}, "purple900");
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, {backgroundColor: bgColor}, style]}>
      <ThemedText style={[textStyle]}>{children}</ThemedText>
    </TouchableOpacity>
  );
};

export default MButton;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    paddingInline: 16,
    paddingBlock: 8,
  },
});
