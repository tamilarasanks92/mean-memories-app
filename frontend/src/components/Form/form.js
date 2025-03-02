import React, { useEffect, useState } from "react";
import { Button, Input, Paper, TextField, Typography } from "@mui/material";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/actions/posts";

const Form = ({ currentid, setcurrentid }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentid ? state.posts.find((post) => post._id === currentid) : null
  );
  const user = JSON.parse(localStorage.getItem('profile')); // useSelector((state) => JSON.parse(state?.profile));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentid) {
      dispatch(updatePost(currentid, postData));
      clear()
    } else {
      dispatch(createPost({...postData, name: user.result.name, avatarUrl: user.result.picture}));
      clear()
    }
  };
  const clear = () => {
    setcurrentid(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result) {
    return <Paper>
      <Typography sx={{padding: 2}} align="center" variant="h6">Please sign in to memories app to like, share and create memories</Typography>
    </Paper>
  }

  return (
    <Paper sx={styles.paper}>
      <form
        autoComplete="off"
        noValidate
        sx={[styles.root, styles.form]}
        onSubmit={handleSubmit}
      />
      <Typography variant="h6">Creating a memory</Typography>
      <TextField
        sx={styles.textField}
        name="tile"
        variant="outlined"
        label="Title"
        fullWidth
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField
        sx={styles.textField}
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <TextField
        sx={styles.textField}
        name="tags"
        variant="outlined"
        label="Tags"
        fullWidth
        value={postData.tags}
        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
      />
      <Input
        type="file"
        name="Upload Image"
        id="file"
        sx={styles.fileInput}
        accept=".jpeg, .jpg, .png"
        onChange={(e) => {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            setPostData({ ...postData, selectedFile: reader.result });
          };
        }}
      />
      <Button
        sx={styles.buttonSubmit}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        onClick={handleSubmit}
        fullWidth
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        type="submit"
        fullWidth
        onClick={clear}
      >
        Clear
      </Button>
    </Paper>
  );
};

export default Form;
