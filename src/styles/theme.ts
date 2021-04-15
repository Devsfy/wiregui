import { theme, Theme } from "@chakra-ui/react";

const customTheme: Theme = {
  ...theme,
  fonts: {
    body: "Roboto, system-ui, sans-serif",
    heading: "Roboto, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  radii: {
    ...theme.radii,
    sm: "4px",
    md: "8px",
  },
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      "100": "#3B3B3B",
      "200": "#2A2A2A",
      "300": "#1B1B1B",
    },
    orange: {
      ...theme.colors.orange,
      "200": "#FF6C0E",
    },
  },
};

export default customTheme;
