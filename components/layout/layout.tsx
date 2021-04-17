import { Container, Grid, Button } from "@material-ui/core";

import useStyles from "./styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

export default function Layout({ children, window }) {
  const classes = useStyles();
  return (
    <Container maxWidth="md" id="top">
      <Grid className={classes.nav}>
        <Button className={classes.buttons} href="/">
          Top
        </Button>
        <Button className={classes.buttons} href="/new">
          New
        </Button>
        <Button className={classes.buttons} href="/best">
          Best
        </Button>
        <Button className={classes.buttons} href="/ask">
          Ask
        </Button>
        <Button className={classes.buttons} href="/show">
          Show
        </Button>
        <Button className={classes.buttons} href="/jobs">
          Jobs
        </Button>
      </Grid>
      {children}
      <ScrollTop window={window}>
        <Fab color="secondary" size="small" aria-label="back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
}

function ScrollTop({ children, window }) {
  const classes = useStyles();

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
      <div onClick={handleClick} role="presentation" className={classes.float}>
        {children}
      </div>
    </Zoom>
  );
}
