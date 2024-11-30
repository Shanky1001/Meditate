import Reactotron from "reactotron-react-native";
import {reactotronRedux} from "reactotron-redux";

const reactotron = Reactotron.configure({
  name: "Meditate App",
})
  .useReactNative({
    asyncStorage: true,
    editor: true,
  })
  .use(reactotronRedux()) // for redux storage
  .connect();

export default reactotron;
