import * as React from "react";
import {ScrollView, ViewProps, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {ThemedView, useThemeColor} from "../theme/Themed";

interface Props extends ViewProps {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ScreenWrapper: React.FC<Props> = ({scroll, style, children}) => {
  const backgroundColor = useThemeColor({}, "background");

  return scroll ? (
    <ScrollView
      testID="screen-scroll"
      contentContainerStyle={styles.contentContainer}
      style={[styles.container, {backgroundColor}, style]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <ThemedView testID="screen-view" style={style}>
      {children}
    </ThemedView>
  );
};
export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});
