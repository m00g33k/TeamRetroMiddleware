import { database } from "../database";

import express = require("express");
import Board from "../schema/Board";
import { validate } from "class-validator";

export const postOneBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const newBoard = new Board();
  newBoard.title = req.body.title;

  const errors = await validate(newBoard);

  if (errors.length > 0) {
    res.status(400).json({ error: "invalid request", message: errors });
    return;
  }
  try {
    const result = await database.collection("boards").add(newBoard.toJson());
    res.json({
      message: "Board successfully created",
      id: result.id
    });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong!",
      message: e
    });
  }
};
