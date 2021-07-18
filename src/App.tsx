import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RecoilRoot } from "recoil";
import { ipcRenderer } from "electron";
import { checkWgIsInstalled } from "wireguard-tools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import AppProvider from "./context";
import Routes from "./routes/index";
import store from "./store";

import * as WireGuard from "./utils/wg";
import { fetchFiles, updateStatus } from "./store/modules/wgConfig/action";
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

    ipcRenderer.on("toggleTunnel", async (event, args) => {
      try {
        const started = await WireGuard.toggle(args.path);
        const action = started ? "Activated" : "Deactivated";
        const message = `${action} ${args.name}`;

        toast(message, { type: "success" });
        new Notification("Wire GUI", { body: message });

        dispatch(updateStatus(started ? args.name : ""));
      } catch (e) {
        toast(e.message, { type: "error" });
        new Notification("Wire GUI", { body: e.message });
      }
    });

    ipcRenderer.send("check-for-updates");
    ipcRenderer.on("update-available", () => {
      toast("There's a new update available, check our github releases page.", { type: "warning" });
    });

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
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  );
}
