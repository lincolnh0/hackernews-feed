import { useState } from "react";
import Head from "next/head";

import { Box } from "@material-ui/core";
import StoryList from "@/components/story-list/StoryList";

export default function Job({ items }) {
  return (
    <Box>
      <Head>
        <title>Jobs - Hacker News</title>
      </Head>
      <StoryList cards={items} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );
  const json = await res.json();
  return {
    props: {
      items: json,
    },
  };
}
