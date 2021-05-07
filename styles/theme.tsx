import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#58A4B0",
    },
    secondary: {
      main: "#C17C74",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#58A4B0",
    },
    secondary: {
      main: "#C17C74 ",
    },
  },
});
