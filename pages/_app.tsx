import { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "@/components/layout/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeContext } from "../lib/theme-context";

export const cache = createCache({ key: "css", prepend: true });
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme((prevState) => {
      return prevState.palette.type === "light" ? darkTheme : lightTheme;
    });
  };
  return (
    <CacheProvider value={cache}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}

export default MyApp;
