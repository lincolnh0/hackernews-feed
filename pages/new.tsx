import { useState } from "react";
import Head from "next/head";

import { Box } from "@material-ui/core";
import StoryList from "@/components/story-list/StoryList";

export default function New({ items }) {
  return (
    <Box>
      <Head>
        <title>New - Hacker News</title>
      </Head>
      <StoryList cards={items} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  const json = await res.json();
  return {
    props: {
      items: json,
    },
  };
}
