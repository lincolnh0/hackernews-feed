import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "@/components/layout/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@material-ui/core/CssBaseline";
import rootTheme from "../styles/theme";
import { ThemeContext } from "../lib/theme-context";

export const cache = createCache({ key: "css", prepend: true });
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(createMuiTheme(rootTheme));
  return (
    <CacheProvider value={cache}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
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
