import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Revenues } from "../../entities/Revenue";

export const GetTotalRevenues = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Revenues);
    const revenueTotal = await repo
      .createQueryBuilder("revenue")
      .select("SUM(revenue.value)", "sum")
      .getRawOne();
    return res.json({ sum: parseFloat(revenueTotal.sum.toFixed(2)) });
  } catch {
    return res.status(500).json({ message: "Error " });
  }
};

