import express from "express";
import UserRouter from "./Router/UserRouter";
import CommentRouter from "./Router/CommentsRouter";
import { dbConnection } from "./database/dbConnect";
import { closeDatabaseConnection } from "./database/dbConnect";
import { app } from "./app";
dbConnection();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port ", port);
});

process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
