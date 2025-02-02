import {useEffect, useState} from "react";
import {useColorScheme as _useColorScheme} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemePreference = "light" | "dark" | "system";

interface ColorSchemeHook {
  colorScheme: ThemePreference;
  setColorScheme: (scheme: ThemePreference) => Promise<void>;
  activeTheme: "light" | "dark"; // The actual theme being applied
  isLoading: boolean;
}

const THEME_PREFERENCE_KEY = "@theme_preference";

export function useColorScheme(): ColorSchemeHook {
  const systemColorScheme = _useColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Load the saved theme preference from AsyncStorage
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
      if (savedTheme) {
        setThemePreference(savedTheme as ThemePreference);
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save theme preference to AsyncStorage
  const saveThemePreference = async (newTheme: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newTheme);
      setThemePreference(newTheme);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  // Determine the active theme based on preference and system theme
  const getActiveTheme = (): "light" | "dark" => {
    if (themePreference === "system") {
      return systemColorScheme || "light";
    }
    return themePreference;
  };

  return {
    colorScheme: themePreference,
    setColorScheme: saveThemePreference,
    activeTheme: getActiveTheme(),
    isLoading,
  };
}

// Theme context types
export interface ThemeContextType {
  colorScheme: ThemePreference;
  setColorScheme: (scheme: ThemePreference) => Promise<void>;
  activeTheme: "light" | "dark";
}
