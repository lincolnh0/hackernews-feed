import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  nav: {
    marginTop: theme.spacing(2),
  },
  float: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
  },
}));

export default useStyles;
