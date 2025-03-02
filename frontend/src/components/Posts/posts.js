import React from "react";
import { Box, CircularProgress, Grid2 as Grid, Paper } from "@mui/material";
import Post from "./Post/post";
import { useSelector } from "react-redux";

const Posts = ({ setcurrentid }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <Paper className="text-center text-wrap p-5 w-50" elevation={3}>No posts found</Paper>
  ) : (
      <Grid container alignItems="inherit" spacing={3}>
        {posts.map((post) => (
          <Grid
            key={post._id}
            size={{ xs: 12, sm: 12, md: 12 }}
            sx={{ maxHeight: 500 }}
          >
            <Post post={post} setcurrentid={setcurrentid} />
          </Grid>
        ))}
      </Grid>
  );
};

export default Posts;
