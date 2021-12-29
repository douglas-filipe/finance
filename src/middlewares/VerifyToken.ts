import { verify } from "jsonwebtoken";
import { Users } from "../entities/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
const secret = process.env.SECRET;

interface IDecoded {
  id: string;
  email: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "Token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = (await verify(token, secret)) as IDecoded;
    req.id = decoded.id;
    return next();
  } catch {
    return res.json({ message: "Invalid Token" });
  }
};
