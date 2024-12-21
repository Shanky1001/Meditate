import React from "react";
import {StatusBar} from "react-native";
import Navigation from "./src/navigation/Navigation";
import RootProvider from "./src/Providers/RootProvider";

function App(): React.JSX.Element {
  return (
    <RootProvider>
      <StatusBar />
      <Navigation />
    </RootProvider>
  );
}

export default App;
