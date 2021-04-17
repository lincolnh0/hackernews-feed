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

export default function Comment({ id, level = 1, showChildren = 0 }) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(showChildren <= 0);

  const timeAgo = (pastDate) => {
    const diff = (Date.now() - pastDate) / 1000;
    const units = ["s", "m", "h", "d"];
    const divider = [1, 60, 3600, 86400];
    let results = "";
    units.forEach((unit, index) => {
      if (diff > divider[index]) {
        results = Math.round(diff / divider[index]) + unit;
      }
    });

    return results;
  };

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

  if (!data.by) {
    return null;
  }

  return (
    <Card className={classes.root} variant="outlined" style={{ marginLeft: 4 }}>
      <CardActionArea onClick={handleCollapse}>
        <Typography style={{ marginBottom: "8px" }}>
          {data.by} - {timeAgo(new Date(data.time * 1000))}
        </Typography>
      </CardActionArea>

      {collapsed ? null : (
        <Box borderTop={"1px solid #ccc"} pt={2}>
          <Typography dangerouslySetInnerHTML={{ __html: data.text }} />
          {data.kids
            ? data.kids.map((kid, index) => {
                return (
                  <Comment
                    key={kid}
                    id={kid}
                    level={level + 1}
                    showChildren={parseInt(
                      ((showChildren - level) / (index + 1)).toPrecision(1)
                    )}
                  />
                );
              })
            : null}
        </Box>
      )}
    </Card>
  );
}
