module.exports = {
  root: true,
  extends: ["@react-native", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["warn", {endOfLine: "auto"}],
    "react-hooks/exhaustive-deps": "off",
  },
};
