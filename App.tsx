import React, {useEffect, useState} from "react";
import {Appearance, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider} from "react-native-paper";
import Navigation from "./src/navigation/Navigation";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {lightTheme, darkTheme} from "./src/constants/theme";

function App(): React.JSX.Element {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (colorScheme === "dark") {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    });

    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider theme={theme}>
          <StatusBar />
          <Navigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
