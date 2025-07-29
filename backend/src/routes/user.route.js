import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/model.user.js";
import errorHandler from "../middlewares/middleware.error.js";
import protectRoute from "../middlewares/middleware.protect.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Logged In Succesfully",
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) return res.json({ message: "All fields are required" });

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged Out Successfully" });
});

router.get("/me", protectRoute, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "User fetched successfully",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

export default router;
