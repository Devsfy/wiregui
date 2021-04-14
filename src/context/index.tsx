import React from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>;
}

export default AppProvider;
