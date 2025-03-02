import { createTransport } from "nodemailer";
import bcrypt from "bcryptjs";
import userOTPVerification from "../models/otp.js";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

const transporter = createTransport({
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PWD,
  },
});

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashOTP = await bcrypt.hash(otp, 10);
    const result = await userOTPVerification.create({
      email,
      otp: hashOTP,
      createdAt: Date.now(),
      expriresAt: Date.now() + 3600000,
    });
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email verification",
      html: `<p>Enter <b>${otp}</b> to verify the email and complete the registration</p>`,
    });
    res.status(200).json({
      message: "Verification email has been sent",
      data: req.body,
    });
  } catch (error) {
    res.statusMessage = "Error while registratio and sending the OTP";
    res
      .status(404)
      .send({ message: "Error while registering and sending the OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  const { data, otp } = req.body;
  const { email } = data;
  try {
    const userOTPRecords = await userOTPVerification.find({ email });
    if (userOTPRecords.length <= 0)
      throw new Error("OTP has not been received yet");
    const { expriresAt } = userOTPRecords[0];
    if (expriresAt < Date.now()) {
      await userOTPVerification.deleteMany({ email });
      throw new Error("OTP has been expired. Please try resending the OTP");
    }
    const hashedOTP = userOTPRecords[0].otp;
    const isVerified = await bcrypt.compare(otp, hashedOTP);
    // console.log('Is verified: ', isVerified, otp)
    if (isVerified) {
      const { password, firstName, lastName } = data;
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await Users.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
      await userOTPVerification.deleteMany({ email });
      res.status(200).json({ result, token });
    } else {
      throw new Error("Invalid OTP. Please reenter the OTP correctly");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
