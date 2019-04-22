import { database } from "../database";

import express = require("express");
import User from "../schema/User";
import { validate } from "class-validator";

import shortid = require("shortid");
const firebase = require("firebase");
import { key as serviceAccountKey } from "../serviceAccountKey";
import { RequestAuthIUser } from "../types";
firebase.initializeApp(serviceAccountKey);

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  const userParams = req.body;
  const newUser: User = Object.assign(new User(), userParams);
  newUser.id = shortid.generate();
  newUser.createdDate = new Date().toISOString();

  const errors = await validate(newUser);

  if (errors.length > 0) {
    return res.status(400).json({ error: "invalid request", message: errors });
  }
  try {
    const auth = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    const token = await auth.user.getIdToken();
    newUser.userId = auth.user.uid;
    await database.doc(`/users/${newUser.id}`).set(newUser.toJson());
    return res.status(201).json({
      token
    });
  } catch (e) {
    return res.status(500).json({
      error: "something went wrong!",
      message: e
    });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    const token = await auth.user.getIdToken();
    return res.json({
      token
    });
  } catch {
    return res
      .status(403)
      .json({ general: "Wrong credentials, please try again" });
  }
};

export const userMe = async (req: RequestAuthIUser, res: express.Response) => {
  return res.json(req.user);
};
