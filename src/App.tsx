import React, { useEffect } from "react";
import { checkWgIsInstalled } from 'wireguard-tools';

import AppProvider from "./context";

import Routes from "./routes/index";

function App() {
  // Check if wireguard is installed, since there's nothing
  // the user can do without it we should just exit the
  // application after the alert is closed.
  useEffect(() => {
    async function check() {
      try {
        await checkWgIsInstalled();
      } catch (err) {
        alert("Wireguard is not installed on the system.");
      }
    }

    check();
  }, []);

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
