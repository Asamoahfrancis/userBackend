import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModal } from "../Models/UserModel";
import { Document } from "mongoose";

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
    const token = req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      throw new Error("Authorization header is missing");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

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
