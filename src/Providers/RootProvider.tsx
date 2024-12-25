import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider} from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ContextProvider from "./ContextProvider";

const RootProvider = ({children}: {children: React.ReactElement}) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <PaperProvider>
          <ContextProvider>{children}</ContextProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootProvider;
