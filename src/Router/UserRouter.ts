import express from "express";
import cors from "cors";
import { userModal } from "../Models/UserModel";
import authMiddleware, { CustomRequest } from "../middleware/authMiddlerware";
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
    if (!getUser) {
      return res.status(404).send({ Error: "error fetching user" });
    }
    const token = await getUser.generateToken();
    res.status(200).send({ getUser, token });
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRouter.get("/users", async (req, res) => {
  try {
    const allusers = await userModal.find({});
    if (!allusers) {
      return res.status(404).send("no users found");
    }

    res.status(200).send(allusers);
  } catch (error: any) {
    res.status(404).send({ Error: error.message });
  }
});

UserRouter.get("/users/me", authMiddleware, (req: CustomRequest, res) => {
  res.status(200).send(req.getUser);
});

UserRouter.get("/users/:id", authMiddleware, (req, res) => {
  res.status(200).send("This route is to get single user");

  try {
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRouter.post(
  "/users/logout",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      req.getUser.tokens = req.getUser.tokens.filter(
        (token: any) => token.token !== req.token
      );
      await req.getUser.save();
      res.status(200).send("logged out successfully");
    } catch (error: any) {
      res.status(500).send({ Error: error.message });
    }
  }
);

UserRouter.post(
  "/users/logoutAll",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      req.getUser.tokens = [];
      await req.getUser.save();
      res.status(200).send("Logged out from all the devices");
    } catch (error: any) {
      res.status(500).send({ Error: error.message });
    }
  }
);

export default UserRouter;
875719;
