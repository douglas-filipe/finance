import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Revenues } from "../../entities/Revenue";

export const CreateRevenueController = async (req: Request, res: Response) => {
  try {
    const { name, value, user_id } = req.body;
    const repo = getRepository(Revenues);
    if (await repo.findOne({ name: name })) {
      return res.status(409).json({ message: "Name exists!" });
    }
    const revenue = repo.create({
      name,
      value,
      user_id,
    });
    await repo.save(revenue);
    return res.status(201).json(revenue);
  } catch {
    return res.status(409).json({ message: "Error creating revenue!" });
  }
};
