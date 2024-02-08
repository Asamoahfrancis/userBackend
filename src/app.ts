import express from "express";
import UserRouter from "./Router/UserRouter";
import CommentRouter from "./Router/CommentsRouter";
import { dbConnection } from "./database/dbConnect";

dbConnection();

export const app = express();

app.use(UserRouter);
app.use(CommentRouter);
