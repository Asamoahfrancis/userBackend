import express from "express";
import cors from "cors";
import authMiddleware from "../../middleware/authMiddlerware";
const SingleUser = express.Router();

SingleUser.use(express.json());
SingleUser.use(cors());

SingleUser.get("/users/:id", authMiddleware, (req, res) => {
  res.status(200).send("This route is to get single user");
  try {
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});
