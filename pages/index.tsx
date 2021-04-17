import Head from "next/head";

import { Box } from "@material-ui/core";
import StoryList from "@/components/story-list/StoryList";

export default function Home({ items }) {
  return (
    <Box>
      <Head>
        <title>Top - Hacker News</title>
      </Head>
      <StoryList cards={items} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const json = await res.json();
  return {
    props: {
      items: json,
    },
  };
}
