import React, {createContext, useContext} from "react";
import {anxiety, Meditation, popular, sleep} from "../constants/data/meditations";

interface DataContextInterface {
  popular: Meditation[];
  sleep: Meditation[];
  anxiety: Meditation[];
  getMeditationDataById: (id: string) => Meditation | undefined;
}
const DataContext = createContext<DataContextInterface>({anxiety: [], popular: [], sleep: [], getMeditationDataById: () => undefined});
const ContextProvider = ({children}: {children: React.ReactElement}) => {
  const getMeditationDataById = (id: string) => {
    const meditation = [...popular, ...anxiety, ...sleep];
    const med = meditation.find(m => m.id === id);
    return med;
  };
  return <DataContext.Provider value={{popular, sleep, anxiety, getMeditationDataById}}>{children}</DataContext.Provider>;
};

export default ContextProvider;

export const GetMeditationData = () => useContext(DataContext);
