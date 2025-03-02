import mongoose, { isValidObjectId } from "mongoose";
import PostMessage from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: "Record not found" });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ messgae: "Error while creating post" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedID = id.replace("}", "");
  const updatedPost = req.body;
  if (!isValidObjectId(updatedID)) return res.status(404).send("No post found");
  await PostMessage.findByIdAndUpdate(updatedID, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const updatedID = id.replace("}", "");
  if (!isValidObjectId(updatedID)) return res.status(404).send("No post found");
  await PostMessage.findByIdAndDelete(updatedID);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if(!req.userId) return res.status(404).json({message: "Unauthenticated"})
  const updatedID = id.replace("}", "");
  if (!isValidObjectId(updatedID)) return res.status(404).send("No post found");
  const post = await PostMessage.findById(updatedID);
  const index = post.likes.findIndex(id => id === String(req.userId))
  if(index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter(id => id !== String(req.userId))
  }
  PostMessage.findByIdAndUpdate(
    updatedID,
    post,
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while liking the post", error);
    });
};
