import { useState } from "react";
import Head from "next/head";

import { Box } from "@material-ui/core";
import StoryList from "@/components/story-list/StoryList";

export default function Show({ items }) {
  return (
    <Box>
      <Head>
        <title>Show HN - Hacker News</title>
      </Head>
      <StoryList cards={items} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/showstories.json"
  );
  const json = await res.json();
  return {
    props: {
      items: json,
    },
  };
}
