import express from "express";
import cors from "cors";
import { CommentsModal } from "../../Models/CommentsModel";
import authMiddleware from "../../middleware/authMiddlerware";
const CommentRouter = express.Router();

CommentRouter.use(express());
CommentRouter.use(cors());

CommentRouter.post("/comments", authMiddleware, async (req, res) => {
  try {
    const newComment = new CommentsModal(req.body);
    const results = await newComment.save();
    res.status(201).send(results);
  } catch (error: any) {
    console.log({ Error: error.message });
  }
});
export default CommentRouter;
