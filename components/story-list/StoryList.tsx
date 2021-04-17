import { useState } from "react";
import NextLink from "next/link";

import { List, Button } from "@material-ui/core";

import StoryCard from "@/components/story-card/StoryCard";
import useStyles from "./styles";

export default function StoryList({ cards }) {
  const classes = useStyles();

  const itemsPerPage = 20;
  const [list, setList] = useState(cards.slice(0, itemsPerPage));

  const showMore = () => {
    setList((prevState) => {
      return cards.slice(0, prevState.length + itemsPerPage);
    });
  };
  return (
    <List className={classes.list}>
      {list.map((id, index) => {
        return <StoryCard key={index} id={id} />;
      })}
      {list.length < cards.length ? (
        <Button onClick={showMore}>Show more</Button>
      ) : null}
    </List>
  );
}
