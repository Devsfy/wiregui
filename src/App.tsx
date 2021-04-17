import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { checkWgIsInstalled } from "wireguard-tools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import AppProvider from "./context";
import Routes from "./routes/index";
import store from "./store";

import { fetchFiles } from "./store/modules/wgConfig/action";
import { AppState, StoreState } from "./types/store";

function App() {
  const dispatch = useDispatch();
  const { userDataPath } = useSelector<StoreState, AppState>(
    (state) => state.app
  );

  useEffect(() => {
    async function check() {
      try {
        await checkWgIsInstalled();
      } catch (err) {
        toast("Wireguard is not installed on the system.", { type: "error" });
      }
    }

    check();
    dispatch(fetchFiles(userDataPath));
  }, []);

  return (
    <AppProvider>
      <Routes />
      <ToastContainer pauseOnFocusLoss={false} />
    </AppProvider>
  );
}

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
