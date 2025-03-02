import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import { sendOTP } from "./otp.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser)
      return res.status(500).json({ message: "User doesn't exist. Please try registering" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(500).json({ message: "Invalid credentials. Please try again with corrent credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(500).json({ message: "User already exists. Please try signing in or signup with different email" });
    sendOTP(req, res);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
