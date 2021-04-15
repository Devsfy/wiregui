import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { checkWgIsInstalled } from "wireguard-tools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import AppProvider from "./context";
import Routes from "./routes/index";
import store from "./store";

function App() {
  useEffect(() => {
    async function check() {
      try {
        await checkWgIsInstalled();
      } catch (err) {
        toast("Wireguard is not installed on the system.", { type: "error" });
      }
    }

    check();
  }, []);

  return (
    <Provider store={store}>
      <AppProvider>
        <Routes />
        <ToastContainer pauseOnFocusLoss={false} />
      </AppProvider>
    </Provider>
  );
}

export default App;
