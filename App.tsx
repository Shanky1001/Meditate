import React from "react";
import {StatusBar, StyleSheet} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider} from "react-native-paper";
import Navigation from "./src/navigation/Navigation";
import {GestureHandlerRootView} from "react-native-gesture-handler";

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider>
          <StatusBar />
          <Navigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#000000",
  },
});

export default App;
