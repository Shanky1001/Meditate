const primary = "#B3A7D1"; // rgb(70, 63, 176)
const purples = {
  purple900: "#4A5784", // rgb(74, 87, 132)
  purple500: "#6F69C9", // rgb(111, 105, 201)
};
const grays = {
  white: "#fff", // rgb(255, 255, 255)
  gray100: "#F2F2F2", // rgb(242, 242, 242)
  gray800: "#5D5D5D", // rgb(93, 93, 93)
  gray900: "#333333", // rgb(51, 51, 51)
  gray950: "#1e1e1e", //rgb(30, 30, 30)
  gray975: "#121212", // rgb(18, 18, 18)
  black: "#000", // rgb(0, 0, 0)
};

export default {
  light: {
    primary,
    text: grays.gray900,
    background: grays.gray100,
    tint: primary,
    tabIconDefault: "#ccc",
    ...purples,
    ...grays,
    completedBackground: primary,
    completedPrimary: grays.white,
    navBarBackground: grays.white,
  },
  dark: {
    primary,
    text: grays.white,
    background: grays.gray900,
    tint: primary,
    tabIconDefault: "#ccc",
    ...purples,
    ...grays,
    white: grays.gray950,
    completedBackground: grays.gray900,
    completedPrimary: purples.purple500,
    navBarBackground: grays.gray975,
  },
};

const lightTheme = {
  colors: {
    primary: "#B3A7D1", // Lavender
    background: "#FFFFFF", // Light background
    cardBackground: "#F7E3A1", // Pale Yellow for cards
    text: "#333333", // Dark text for readability
    textSecondary: "#757575", // Secondary text in gray
    header: "#4A6D92", // Deep Blue for headers
    accent: "#F1B1A1", // Soft Coral for highlights
    border: "#D8D8D8", // Soft Gray borders
    icon: "#4A6D92", // Deep Blue icons
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 18,
    header: 24,
  },
};

const darkTheme = {
  colors: {
    primary: "#B3A7D1", // Lavender (consistent in dark mode)
    background: "#121212", // Dark background
    cardBackground: "#2C2C2C", // Dark gray for cards
    text: "#FFFFFF", // White text for contrast
    textSecondary: "#B0B0B0", // Light gray text for secondary
    header: "#A1C6EA", // Soft Blue header
    accent: "#F1B1A1", // Soft Coral accent
    border: "#444444", // Darker gray for borders
    icon: "#A1C6EA", // Soft Blue icons
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 18,
    header: 24,
  },
};

export {lightTheme, darkTheme};
