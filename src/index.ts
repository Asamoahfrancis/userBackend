import express from "express";
import UserRouter from "./Router/UserRouter/UserRouter";
import CommentRouter from "./Router/CommentsRouter/CommentsRouter";
import { dbConnection } from "./database/dbConnect";
import { closeDatabaseConnection } from "./database/dbConnect";

dbConnection();

const port = process.env.PORT || 5000;
const app = express();

app.use(UserRouter);
app.use(CommentRouter);

app.listen(port, () => {
  console.log("listening on port ", port);
});

process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
