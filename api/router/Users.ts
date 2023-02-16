import express from "express";
import mongoose from "mongoose";
import Users from "../model/Users";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new Users({
      username: req.body.username,

      password: req.body.password,
    });

    user.generateToken();

    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post("/sessions", async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }
  user.generateToken();
  await user.save();

  return res.send({ message: "Username and password correct!", user });
});

export default usersRouter;
