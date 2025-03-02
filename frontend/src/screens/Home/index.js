import { Container, Grow, Grid2 as Grid, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts/posts";
import Form from "../../components/Form/form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../store/actions/posts";

const Home = () => {
  const [currentid, setcurrentid] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentid, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          spacing={3}
          flexDirection={isMobile ? "column-reverse" : ""}
        >
          <Grid size={{ sm: 12, md: 7 }}>
            <Posts setcurrentid={setcurrentid} />
          </Grid>
          <Grid size={{ sm: 12, md: 4 }}>
            <Form currentid={currentid} setcurrentid={setcurrentid} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
