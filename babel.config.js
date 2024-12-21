module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-paper/babel",
    // [
    //   "module:react-native-dotenv", // This plugin has configuration, so it's an array
    //   {
    //     envName: "APP_ENV",
    //     moduleName: "@env",
    //     path: ".env",
    //   },
    // ],
    "react-native-reanimated/plugin", // should always be in last
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
