import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#181b25",
      paper: "#2b2e3b",
    },
    primary: {
      // main: "#6d28d9",
      main: "#7c3aed",
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Default (extra small)
      sm: 480, // Chakra's `sm`
      md: 768, // Chakra's `md`
      lg: 992, // Chakra's `lg`
      xl: 1280, // Chakra's `xl`
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <App />
    </ThemeProvider>
  </StrictMode>
);
