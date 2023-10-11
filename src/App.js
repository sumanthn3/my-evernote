import "./App.css";
import store from "./utils/store";

import { Provider } from "react-redux";
import AppInit from "./Pages/AppInit";
function App() {
  return (
    <Provider store={store}>
      <AppInit />
    </Provider>
  );
}

export default App;
