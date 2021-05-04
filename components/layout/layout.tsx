import { useContext } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { ThemeContext } from "lib/theme-context";

export default function Layout({ children }) {
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Container maxWidth="md" id="top">
      <Grid className={classes.nav}>
        <Button className={classes.buttons} size="small" href="/">
          Top
        </Button>
        <Button className={classes.buttons} size="small" href="/new">
          New
        </Button>
        <Button className={classes.buttons} size="small" href="/best">
          Best
        </Button>
        <Button className={classes.buttons} size="small" href="/ask">
          Ask
        </Button>
        <Button className={classes.buttons} size="small" href="/show">
          Show
        </Button>
        <Button className={classes.buttons} size="small" href="/jobs">
          Jobs
        </Button>
        <IconButton
          className={classes.buttons}
          size="small"
          onClick={toggleTheme}
        >
          <Brightness6Icon />
        </IconButton>
      </Grid>
      {children}
      {/* <ScrollTop>
        <Fab color="secondary" size="small" aria-label="back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
    </Container>
  );
}

function ScrollTop({ children, window = null }) {
  const classes = useStyles();

  if (typeof window !== "undefined") {
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#top"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div
          onClick={handleClick}
          role="presentation"
          className={classes.float}
        >
          {children}
        </div>
      </Zoom>
    );
  }
  return null;
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    padding: theme.spacing(1),
  },
  nav: {
    marginTop: theme.spacing(3),
  },
  float: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
  },
}));
