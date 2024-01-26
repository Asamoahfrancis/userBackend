import jwt from "jsonwebtoken";
import { userModal } from "../Models/UserModel";
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer", " ");
    const decoded: any = jwt.verify(token, "thisismySecrete");

    const getUser = userModal.findOne({ _id: decoded._id, token });
    if (!getUser) return new Error("could not find any user");
    req.getUser = getUser;
    next();
  } catch (error: any) {
    res.status(401).send({ Error: error.message });
  }
};

export default authMiddleware;
