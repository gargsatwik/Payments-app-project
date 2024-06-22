import { Router } from "express";
import { z } from "zod";
import { Users, insertUser, updateUser } from "../db.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";

const userRouter = Router();

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  const data = req.body;
  if (await Users.findOne(data)) {
    res.json("Email already taken / invalid inputs");
  } else {
    const { success } = signupSchema.safeParse(data);
    if (!success) {
      res.json("Enter valid details");
    } else {
      const newUser = await insertUser(data);
      const token = jwt.sign(
        {
          userId: newUser._id,
        },
        JWT_SECRET
      );
      res.json({
        message: "User created successfully",
        token: token,
      });
    }
  }
});

userRouter.post("/sigin", async (req, res) => {
  const data = req.body;
  const { success } = signInSchema.safeParse(data);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const userName = data.username;
  const user = await Users.findOne(userName);
  if (!user) {
    res.status(403).json("User does not exist");
  } else {
    bcrypt.compare(data.password, user.password, (err, result) => {
      if (err) {
        res.json({
          message: "Error while logging in",
        });
      } else {
        if (result) {
          const token = jwt.sign(
            {
              userId: user._id,
            },
            JWT_SECRET
          );
          res.json({ token: token });
          return;
        }
      }
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json("Error while updating information");
  }
  await updateUser(req);
  res.json("Updated successfully");
});

userRouter.get("/bulk", async (req, res) => {
  const keyWord = req.query.filter || "";
  const users = await Users.find({
    $or: [
      {
        firstName: {
          $regex: keyWord,
        },
      },
      {
        lastName: {
          $regex: keyWord,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export { userRouter };
