import { getRepository } from "typeorm";
import { Users } from "../../entities/User";
import { Request, Response } from "express";

export const GetUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repo = getRepository(Users);
    const user = await repo.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      name: user.name,
      email: user.email
    });
  } catch {
    return res.status(500).json({ message: "Error " });
  }
};
