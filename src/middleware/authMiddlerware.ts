import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModal } from "../Models/UserModel";

export interface CustomRequest extends Request {
  [x: string]: any;
  getUser?: any;
  token?: any;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error("Authorization header is missing");
    }
    const decoded: any = jwt.verify(token, "thisismySecrete");

    const getUser = await userModal.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!getUser) {
      throw new Error();
    }
    req.token = token;
    req.getUser = getUser;
    next();
  } catch (error: any) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authMiddleware;
