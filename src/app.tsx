import React from "react";

import AppProvider from "./context";

import Home from "./pages/Home";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
