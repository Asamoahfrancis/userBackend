import express, { Request, Response } from "express";
import cors from "cors";
import { userModal } from "../Models/UserModel";
import authMiddleware, { CustomRequest } from "../middleware/authMiddlerware";
import multer from "multer";
const UserRouter = express.Router();
UserRouter.use(express.json());
UserRouter.use(cors());
const upload = multer({
  // dest: "images",
  // limits: {
  //   fileSize: 1000000,
  // },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(.png|jpg|jpeg)$/)) {
      return cb(new Error("upload a pdff file"));
    }

    cb(null, true);
  },
});
UserRouter.post("/api/users/signup", async (req: CustomRequest, res) => {
  try {
    const newUser = new userModal(req.body);
    const savedUser = await newUser.save();
    const token = await newUser.generateToken();
    res.status(201).send({ savedUser, token });
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRouter.post("/api/users/signin", async (req, res) => {
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
    res.status(400).send({ Error: error.message });
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

UserRouter.get("/api/users/me", authMiddleware, (req: CustomRequest, res) => {
  res.status(200).send(req.getUser);
});

UserRouter.get("/api/users/:id", authMiddleware, (req, res) => {
  res.status(200).send("This route is to get single user");

  try {
  } catch (error: any) {
    res.status(500).send({ Error: error.message });
  }
});

UserRouter.post(
  "/api/users/logout",
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
  "/api/users/logoutAll",
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

UserRouter.delete(
  "/api/users/me",
  authMiddleware,
  async (req: CustomRequest, res) => {
    try {
      if (req.getUser instanceof userModal) {
        const user = await req.getUser.deleteOne();
        res.status(200).send({ message: "User successfully deleted", user });
      } else {
        res.status(401).send({ error: "Failed to delete user" });
      }
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

UserRouter.post(
  "/upload",
  authMiddleware,
  upload.single("upload"),
  async function (req: CustomRequest, res: Response) {
    req.getUser.avatar = req.file?.buffer;
    const savedUser = await req.getUser.save();
    res.status(200).send({ Messagae: savedUser });
  },
  (error: any, req: any, res: any, next: any) => {
    res.status(400).send({ Error: error.message });
  }
);

UserRouter.get("/users/:id/avatar", authMiddleware, async (req, res) => {
  try {
    const user = await userModal.findOne({ _id: req.params.id });
    console.log(user);
    if (!user || !user.avatar) {
      throw new Error("no image found");
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (error: any) {
    res.status(404).send({ Error: error.message });
  }
});

export default UserRouter;
