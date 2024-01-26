import express from "express";
import cors from "cors";
import { userModal } from "../../Models/UserModel";
const UserRouter = express.Router();
UserRouter.use(express.json());
UserRouter.use(cors());

UserRouter.post("/users/signup", async (req, res) => {
  try {
    const newUser = new userModal(req.body);
    const savedUser = await newUser.save();
    await newUser.generateToken();
    res.status(201).send(savedUser);
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRouter.post("/users/signin", async (req, res) => {
  try {
    const getUser = await userModal.getUsercredentials(
      req.body.username,
      req.body.password
    );
    if (!getUser) return res.status(404).send({ Error: "error fetching user" });
    await getUser.generateToken();
    res.status(200).send({ getUser });
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});
export default UserRouter;
