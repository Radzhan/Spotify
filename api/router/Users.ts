import mongoose from "mongoose";
import Users from "../model/Users";
import express from "express";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new Users({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: "Registered successfully!", user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  const user = await Users.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }
  try {
    user.generateToken();
    await user.save();
    return res.send({ message: "Username and password correct!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const success = { message: "OK" };

    if (!token) {
      return res.send(success);
    }

    const user = await Users.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
