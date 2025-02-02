import React, {useCallback, useMemo} from "react";
import {StyleSheet, View, Animated, TouchableOpacity} from "react-native";
import {ThemedText, ThemedView, useThemeColor} from "../../theme/Themed";
import MIcon from "../common/MIcon";

interface ThemeOption {
  id: "light" | "dark" | "system";
  label: string;
  icon: string;
}

const themeOptions: ThemeOption[] = [
  {id: "light", label: "Light", icon: "light-mode"},
  {id: "dark", label: "Dark", icon: "dark-mode"},
  {id: "system", label: "System", icon: "settings-suggest"},
] as const;

export type Theme = "light" | "dark" | "system";
interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({currentTheme, onThemeChange}: ThemeSelectorProps) {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const accent = useThemeColor({}, "primary");
  const white = useThemeColor({}, "white");
  const Color = useMemo(
    () => ({
      bg,
      accent,
      text,
      white,
    }),
    [bg, accent, text, white],
  );

  const handlePress = useCallback((theme: Theme) => onThemeChange(theme), []);

  return (
    <ThemedView style={styles.container}>
      {themeOptions.map(option => (
        <ThemeButton key={option.id} {...option} isSelected={currentTheme === option.id} onPress={() => handlePress(option.id)} colors={Color} />
      ))}
    </ThemedView>
  );
}

interface ThemeButtonProps {
  id: "light" | "dark" | "system";
  label: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
  colors: {
    bg: string;
    text: string;
    accent: string;
    white: string;
  };
}

const ThemeButton = ({id, label, icon, isSelected, onPress, colors}: ThemeButtonProps) => {
  const optionStyles = {
    option: {
      backgroundColor: isSelected ? colors.accent : colors.bg,
      borderColor: isSelected ? colors.accent : colors.text,
    },
    icon: {
      color: isSelected ? colors.white : colors.text,
    },
    text: {
      color: isSelected ? colors.white : colors.text,
    },
    radio: {
      borderColor: isSelected ? colors.white : colors.text,
    },
  };

  return (
    <Animated.View style={[styles.optionContainer]}>
      <TouchableOpacity style={[styles.option, optionStyles.option]} onPress={onPress} activeOpacity={0.7}>
        <MIcon family="MaterialIcons" name={icon} size={24} color={optionStyles.icon.color} />
        <ThemedText style={[styles.optionText, optionStyles.text]}>{label}</ThemedText>
        <View style={[styles.radioOuter, optionStyles.radio]}>{isSelected && <View style={styles.radioInner} />}</View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  optionContainer: {
    width: "100%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
});
