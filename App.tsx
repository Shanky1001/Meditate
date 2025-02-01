import React from "react";
import {StatusBar} from "react-native";
import RootProvider from "./src/Providers/RootProvider";
import Navigation from "./src/navigation";

function App(): React.JSX.Element {
  return (
    <RootProvider>
      <>
        <StatusBar />
        <Navigation />
      </>
    </RootProvider>
  );
}

export default App;
