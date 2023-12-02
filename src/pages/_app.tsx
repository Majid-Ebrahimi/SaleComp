import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
    // fontSize: 13,
  },
  /*   components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: "Rubik";
        src: url("../asset/Rubik/Rubik-Regular.ttf");
        font-weight: 400;
        font-style: normal;
      }
      `,
    },
  }, */
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
