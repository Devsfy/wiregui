import React from "react";

import theme from "../styles/theme";

import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";

interface ThemeContainerProps {
  children?: React.ReactNode;
}

export default function ThemeContainer({ children }: ThemeContainerProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: "dark" }}>
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
