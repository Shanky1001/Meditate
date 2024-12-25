import React, {createContext, useContext} from "react";
import {anxiety, Meditation, popular, sleep} from "../constants/data/meditations";

interface DataContextInterface {
  popular: Meditation[];
  sleep: Meditation[];
  anxiety: Meditation[];
}
const DataContext = createContext<DataContextInterface>({anxiety: [], popular: [], sleep: []});
const ContextProvider = ({children}: {children: React.ReactElement}) => {
  return <DataContext.Provider value={{popular, sleep, anxiety}}>{children}</DataContext.Provider>;
};

export default ContextProvider;

export const GetMeditationData = () => useContext(DataContext);
