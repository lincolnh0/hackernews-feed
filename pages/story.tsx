import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";
import { lightTheme } from "styles/theme";

import { useState, useEffect } from "react";
import useSWR from "swr";

import {
  Box,
  Typography,
  Collapse,
  Fade,
  Button,
  Paper,
} from "@material-ui/core";
import Iframe from "react-iframe";

import ItemEndpoint from "../lib/hn-endpoint";

import CommendCard from "@/components/comment-card/CommentCard";

export default function Story({ id }) {
  const { data, error } = useSWR(id, ItemEndpoint);
  const [preview, setPreview] = useState(false);
  const commentCount = 20;
  const [comments, setComments] = useState(commentCount);
  const classes = useStyles();

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
    <Box pb={8}>
      <Head>
        <title>{data.title} - Hackernews</title>
      </Head>
      <Paper className={classes.body}>
        <Button onClick={() => router.back()}>
          <ArrowBack />
          Back
        </Button>
        <Typography
          variant="h3"
          component="h1"
          className={classes.textPaddingX}
        >
          {data.title}
        </Typography>

        {data.text ? (
          <Box>
            <Typography className={classes.textPaddingAround}>
              {data.by} - {timeAgo(new Date(data.time * 1000))}
            </Typography>

            <Typography
              className={classes.textPaddingAround}
              dangerouslySetInnerHTML={{ __html: data.text }}
            />
          </Box>
        ) : (
          <Typography className={classes.textPaddingX}>
            by {data.by}
            {data.url
              ? "- " + data.url.split("/")[2].replace("www.", "")
              : null}
          </Typography>
        )}

        {data.url ? (
          <Fade in={data.url !== undefined}>
            <Box>
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
        ) : null}
      </Paper>
      {data.kids ? (
        data.kids.slice(0, comments).map((kid, index) => {
          return (
            <CommendCard key={kid} id={kid} showChildren={comments - index} />
          );
        })
      ) : (
        <Paper className={classes.textPaddingAround}>
          <Typography>No comments yet</Typography>
        </Paper>
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

const useStyles = makeStyles({
  body: {
    marginTop: "8px",
    marginBottom: "4px",
    padding: "24px",
    "& a": {
      color: lightTheme.palette.primary.main,
    },
  },
  textPaddingAround: {
    padding: "16px",
  },
  textPaddingX: {
    padding: "16px 0",
  },
});
