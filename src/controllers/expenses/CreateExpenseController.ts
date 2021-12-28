import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Expenses } from "../../entities/Expense";

export const CreateExpenseController = async (req: Request, res: Response) => {
  try {
    const { name, value, user_id } = req.body;
    const repo = getRepository(Expenses);
    const expence = repo.create({
      name,
      value,
      user_id,
    });
    await repo.save(expence);
    return res.status(201).json(expence);
  } catch {
    return res.status(409).json({ message: "Error creating revenue!" });
  }
};
