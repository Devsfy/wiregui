import React from "react";

import AppProvider from "./context";

import Routes from "./routes/index";

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
