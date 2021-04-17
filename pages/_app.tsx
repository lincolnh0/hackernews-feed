import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "@/components/layout/layout";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";

export const cache = createCache({ key: "css", prepend: true });
function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
