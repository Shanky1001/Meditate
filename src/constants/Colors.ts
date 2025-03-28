const primary = "#B3A7D1"; // rgb(70, 63, 176)

const purples = {
  purple900: "#4A5784", // rgb(74, 87, 132)
  purple500: "#6F69C9", // rgb(111, 105, 201)
};

const grays = {
  white: "#FFFFFF", // rgb(255, 255, 255)
  gray100: "#F2F2F2", // rgb(242, 242, 242)
  gray200: "#EEEEEE", // rgb(204, 201, 201)
  gray800: "#5D5D5D", // rgb(93, 93, 93)
  gray900: "#333333", // rgb(51, 51, 51)
  gray950: "#1e1e1e", //rgb(30, 30, 30)
  gray975: "#121212", // rgb(18, 18, 18)
  black: "#000000", // rgb(0, 0, 0)
};

export default {
  light: {
    primary,
    text: grays.gray900,
    background: grays.gray100,
    tint: primary,
    tabIconDefault: "#4A6D92",
    ...purples,
    ...grays,
    completedBackground: primary,
    completedPrimary: grays.white,
    navBarBackground: grays.white,
  },
  dark: {
    primary,
    text: grays.gray100,
    background: grays.gray900,
    tint: primary,
    tabIconDefault: "#A1C6EA",
    ...purples,
    ...grays,
    black: grays.white,
    white: grays.gray950,
    completedBackground: grays.gray900,
    completedPrimary: purples.purple500,
    navBarBackground: grays.gray975,
  },
};
