import { useEffect, useState } from "react";
import NextLink from "next/link";

import useSWR from "swr";

import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import ItemEndpoint from "lib/hn-endpoint";

export default function StoryCard({ id }) {
  const classes = useStyles();

  const { data, error } = useSWR(id, ItemEndpoint);

  if (!data) {
    return null;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea href={data.url}>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography>{new Date(data.time * 1000).toDateString()}</Typography>
        <Typography>Score: {data.score}</Typography>
      </CardActionArea>
      <CardActions>
        {data.kids ? (
          <Button size="small" color="primary" href={"/story?id=" + data.id}>
            {data.kids.length} comments
          </Button>
        ) : (
          <Button size="small" color="primary" href={"/story?id=" + data.id}>
            0 comments
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
