import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Transactions } from "../../entities/Transactions";

export const CreateRevenueController = async (req: Request, res: Response) => {
  try {
    const { name, value, description } = req.body;
    const repo = getRepository(Transactions);
    const revenue = repo.create({
      name,
      value,
      user_id: req.id,
      description,
      type: "revenue",
    });
    await repo.save(revenue);
    return res.status(201).json(revenue);
  } catch {
    return res.status(409).json({ message: "Error creating revenue!" });
  }
};
