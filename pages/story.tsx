import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ArrowBack from "@material-ui/icons/ArrowBack";

import { useState, useEffect } from "react";
import useSWR from "swr";

import { Box, Typography, Collapse, Fade, Button } from "@material-ui/core";
import Iframe from "react-iframe";

import ItemEndpoint from "../lib/hn-endpoint";

import CommendCard from "@/components/comment-card/CommentCard";

export default function Story({ id }) {
  const { data, error } = useSWR(id, ItemEndpoint);
  const [preview, setPreview] = useState(false);
  const commentCount = 20;
  const [comments, setComments] = useState(commentCount);

  const togglePreview = () => {
    setPreview((prevState) => {
      return !prevState;
    });
  };

  const router = useRouter();

  const handleScroll = (event) => {
    const threshold =
      document.body.offsetHeight - document.documentElement.clientHeight - 300;
    if (window.scrollY > threshold) {
      setComments((prevState) => {
        window.removeEventListener("scroll", handleScroll);
        return prevState + commentCount;
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
      }, 2000);
    }
  }, [comments]);

  if (!data) {
    return null;
  } else {
  }

  return (
    <Box mb={16}>
      <Head>
        <title>{data.title} - Hackernews</title>
      </Head>
      <Box mt={8} mb={4}>
        <Button onClick={() => router.back()}>
          <ArrowBack />
          Back
        </Button>
        <Typography variant="h3" component="h1" style={{ padding: "16px 0" }}>
          {data.title}
        </Typography>
        <Fade in={data.url !== null}>
          <Box>
            <Typography style={{ padding: "16px 0" }}>
              {data.url.split("/")[2].replace("www.", "")}
            </Typography>
            <Box mb={4}>
              <Button color="primary" onClick={togglePreview}>
                Preview
              </Button>
              <Button color="secondary" href={data.url} target="_blank">
                Source
              </Button>
            </Box>
            <Collapse in={preview}>
              <Iframe url={data.url} width="100%" height="500px" />
            </Collapse>
          </Box>
        </Fade>
      </Box>
      {data.kids ? (
        data.kids.slice(0, comments).map((kid, index) => {
          return (
            <CommendCard key={kid} id={kid} showChildren={comments - index} />
          );
        })
      ) : (
        <Typography>No comments yet</Typography>
      )}
    </Box>
  );
}

export async function getServerSideProps(context) {
  if (context.query.id != null) {
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
