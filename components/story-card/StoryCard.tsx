import { useEffect, useState } from "react";
import NextLink from "next/link";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ChatIcon from "@material-ui/icons/Chat";
import useSWR from "swr";

import {
  Card,
  CardActionArea,
  CardActions,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import ItemEndpoint from "lib/hn-endpoint";

export default function StoryCard({ id }) {
  const classes = useStyles();

  const { data, error } = useSWR(id, ItemEndpoint);

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

  if (!data) {
    return null;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea href={"/story?id=" + data.id}>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <CardActions>
          <ChatIcon />
          {data.kids ? (
            <Typography>{data.kids.length}</Typography>
          ) : (
            <Typography>{0}</Typography>
          )}
          <AccessTimeIcon />
          <Typography>{timeAgo(new Date(data.time * 1000))}</Typography>
          <ArrowUpwardIcon />
          <Typography>{data.score}</Typography>
          <Button target="_blank" color="secondary" href={data.url}>
            Source
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
// href={data.url}
