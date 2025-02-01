import {StyleSheet, Text, View} from "react-native";
import React, {useMemo} from "react";

interface MAvatarProps {
  icon?: React.ReactElement;
  label: string;
  size?: number;
}
// Predefined colors for better visual appeal
const AVATAR_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEEAD", // Yellow
  "#D4A5A5", // Pink
  "#9B59B6", // Purple
  "#3498DB", // Light Blue
  "#E67E22", // Orange
  "#1ABC9C", // Turquoise
];
export default function MAvatar({icon, label, size}: MAvatarProps) {
  const backgroundColor = useMemo(() => {
    const index =
      Math.abs(
        label.split("").reduce((acc, char) => {
          return acc + char.charCodeAt(0);
        }, 0),
      ) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  }, [label]);
  return (
    <View style={[styles.container, {width: size, height: size, backgroundColor: icon ? "#E1E1E1" : backgroundColor}]}>
      {icon ? icon : <Text style={styles.letterText}>{label.charAt(0).toUpperCase()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E1E1",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  letterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
  },
});
