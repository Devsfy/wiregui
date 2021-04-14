import React from "react";

import ThemeProvider from "./themeProvider";
interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default AppProvider;
