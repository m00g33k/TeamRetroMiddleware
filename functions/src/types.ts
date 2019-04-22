import express = require("express");
import User from "./schema/User";
export interface RequestAuthIUser extends express.Request {
  user: User;
}
