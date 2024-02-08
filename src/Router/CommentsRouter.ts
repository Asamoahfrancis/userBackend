import express from "express";
import cors from "cors";
import { CommentsModal } from "../Models/CommentsModel";
import authMiddleware from "../middleware/authMiddlerware";
import { CustomRequest } from "../middleware/authMiddlerware";
import { optional } from "zod";

type matchType = {
  completed: boolean;
};
const CommentRouter = express.Router();

CommentRouter.use(express());
CommentRouter.use(cors());

CommentRouter.post(
  "/comments",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      const newComment = new CommentsModal({
        ...req.body,
        owner: req.getUser._id,
      });
      const results = await newComment.save();
      res.status(201).send(results);
    } catch (error: any) {
      console.log({ Error: error.message });
    }
  }
);

CommentRouter.get(
  "/comments/:id",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      const id = req.params.id;
      const commentDocument = await CommentsModal.findOne({
        _id: id,
        owner: req.getUser._id,
      });

      if (!commentDocument) {
        return res.status(401).send({ Error: "no comment found" });
      }

      res.status(200).send(commentDocument);
    } catch (error: any) {
      res.status(404).send({ Error: error.message });
    }
  }
);
CommentRouter.get(
  "/comments/id/me",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      const commentDocuments = await CommentsModal.find({
        owner: req.getUser._id,
      });

      if (!commentDocuments || commentDocuments.length === 0) {
        return res
          .status(404)
          .send({ Error: "No comments found for the user" });
      }

      res.status(200).send({ comments: commentDocuments });
    } catch (error: any) {
      res.status(500).send({ Error: error.message });
    }
  }
);

CommentRouter.get("/comments", authMiddleware, async function (req, res) {
  try {
    let matches: matchType = {
      completed: false,
    };
    if (req.query.completed) {
      matches.completed = req.query.completed == "true";
    }
    const commentsResults = await CommentsModal.find(matches, null, {
      limit: 2,
    });
    if (!commentsResults) {
      return res.status(400).send({ Errror: "failed to match" });
    }
    res.status(200).send(commentsResults);
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

export default CommentRouter;
