import { useEffect, useState } from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { List, Fade, Button } from "@material-ui/core";

import StoryCard from "@/components/story-card/StoryCard";
import useStyles from "./styles";

export default function StoryList({ cards }) {
  const classes = useStyles();

  const itemsPerPage = 20;
  const [list, setList] = useState(cards.slice(0, itemsPerPage));

  const handleScroll = (event) => {
    const threshold =
      document.body.offsetHeight - document.documentElement.clientHeight - 300;
    if (window.scrollY > threshold) {
      setList((prevState) => {
        window.removeEventListener("scroll", handleScroll);
        return cards.slice(0, prevState.length + itemsPerPage);
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
      }, 2000);
    }
  }, [list]);

  return (
    <List className={classes.list}>
      {list.map((id, index) => {
        return <StoryCard key={index} id={id} />;
      })}
    </List>
  );
}
