import { admin, database } from "../database";
import express = require("express");
import { RequestAuthIUser } from "../types";
import User from "../schema/User";

export default async (
  req: RequestAuthIUser,
  res: express.Response,
  next: express.NextFunction
) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = await database
      .collection("users")
      .where("userId", "==", decodedToken.uid)
      .limit(1)
      .get();
    req.user = Object.assign(new User(), user.docs[0].data());
    return next();
  } catch (err) {
    return res.status(403).json({
      error: "auth failed",
      message: err
    });
  }
};
