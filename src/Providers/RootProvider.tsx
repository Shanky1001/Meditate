import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider} from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <PaperProvider>{children}</PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootProvider;
