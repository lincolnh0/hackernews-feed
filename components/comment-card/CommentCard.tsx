import { useEffect, useState } from "react";
import useSWR from "swr";

import {
  Card,
  CardActionArea,
  Box,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import ItemEndpoint from "lib/hn-endpoint";

export default function Comment({ id }) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed((prevState) => {
      return !prevState;
    });
  };

  const { data, error } = useSWR(id, ItemEndpoint);

  if (!data) {
    return (
      <Card className={classes.root} variant="outlined">
        Loading
      </Card>
    );
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={handleCollapse}>
        <Typography>
          {data.by} - {new Date(data.time * 1000).toDateString()}
        </Typography>
      </CardActionArea>

      {collapsed ? null : (
        <Box>
          <Typography dangerouslySetInnerHTML={{ __html: data.text }} />
          {data.kids
            ? data.kids.map((kid) => {
                return <Comment key={kid} id={kid} />;
              })
            : null}
        </Box>
      )}
    </Card>
  );
}
