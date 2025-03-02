import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Text,
  Avatar,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import moment from "moment";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../store/actions/posts";

const Post = ({ post, setcurrentid }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.sub
  const LikeComponent = () => {
    if (post.likes.length > 0) {
      const isLiked = post.likes.find((id) => id === userId);
      return isLiked ? (
        <>
          <ThumbUpAltIcon />
          <p>
            &nbsp;{" "}
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others liked`
              : `${post.likes.length} Liked`}
          </p>
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon />
          <p>
            &nbsp; {post.likes.length}{" "}
            {post.likes.length === 1 ? "Like" : "Likes"}
          </p>
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon />
        <p>&nbsp; Like</p>
      </>
    );
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          <Avatar alt={post.title} src={post.avatarUrl} />
        }
        action={
          (post.creator === userId) && (
            <IconButton onClick={() => setcurrentid(post._id)}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        sx={styles.media}
        width="100%"
        height="50%"
        component="img"
        src={post.selectedFile}
        title={post.title}
      />
      <CardContent size="small">
        <div>
          <Typography variant="body2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5">
          {post.title}
        </Typography>
        <Typography variant="body2" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={styles.cardActions} disableSpacing>
        <Button
          disabled={!user?.result}
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <LikeComponent />
        </Button>
        {post.creator === userId && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
