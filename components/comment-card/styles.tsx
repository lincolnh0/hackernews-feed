import { makeStyles } from "@material-ui/core";
import { lightTheme } from "styles/theme";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    margin: "20px 0",
  },
  body: {
    marginBottom: "8px",
    "& a": {
      color: lightTheme.palette.primary.main,
    },
  },
});

export default useStyles;
