import Head from "next/head";
import NextLink from "next/link";
import useSWR from "swr";

import { Box, Typography, Link } from "@material-ui/core";

import ItemEndpoint from "../lib/hn-endpoint";

import CommendCard from "@/components/comment-card/CommentCard";

export default function Story({ id }) {
  const { data, error } = useSWR(id, ItemEndpoint);

  if (!data) {
    return null;
  }
  return (
    <Box>
      {data.url ? (
        <Typography variant="h3" component="h1">
          <NextLink href={data.url} passHref>
            <Link> {data.title}</Link>
          </NextLink>
        </Typography>
      ) : (
        <Typography variant="h3" component="h1">
          {data.title}
        </Typography>
      )}
      {data.kids
        ? data.kids.map((kid) => {
            return <CommendCard key={kid} id={kid} />;
          })
        : null}
    </Box>
  );
}

export async function getServerSideProps(context) {
  if (context.query.id !== null) {
    return {
      props: {
        id: context.query.id,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
