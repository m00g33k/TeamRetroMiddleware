import * as functions from "firebase-functions";

const app = require("express")();

// // https://firebase.google.com/docs/functions/typescript

import { postOneBoard } from "./endpoints/boards";
import { registerUser, loginUser, userMe } from "./endpoints/users";
import fbAuth from "./utils/fbAuth";

app.post("/boards", postOneBoard);
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);
app.post("/users/me", fbAuth, userMe);

exports.api = functions.region("asia-northeast1").https.onRequest(app);
