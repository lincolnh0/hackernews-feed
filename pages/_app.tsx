import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "@/components/layout/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeContext } from "../lib/theme-context";

export const cache = createCache({ key: "css", prepend: true });
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode("dark");
    }
  }, []);
  return (
    <CacheProvider value={cache}>
      <ThemeContext.Provider value={theme == "light" ? lightTheme : darkTheme}>
        <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <Layout toggleTheme={toggleTheme}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}

export default MyApp;
