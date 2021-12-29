import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Transactions } from "../../entities/Transactions";

export const CreateExpenseController = async (req: Request, res: Response) => {
  try {
    const { name, value, description } = req.body;
    const repo = getRepository(Transactions);
    const expence = repo.create({
      name,
      value,
      user_id: req.id,
      type: "expense",
      description
    });
    await repo.save(expence);
    return res.status(201).json(expence);
  } catch {
    return res.status(409).json({ message: "Error creating expense!" });
  }
};
