import { Container, Grid, Button } from "@material-ui/core";

import useStyles from "./styles";

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
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
    </Container>
  );
}
