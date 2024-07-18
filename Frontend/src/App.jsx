import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Provider } from "react-redux";
import Loginpage from "./Pages/Loginpage";
import { store } from "./Store/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <Loginpage />
    </Provider>
  );
}

export default App;
