import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../../entities/User";
import { Transactions } from "../../entities/Transactions";

export const GetExpenseRevenueAndTotalController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoTransaction = await getRepository(Transactions);
    const repoUser = await getRepository(Users);

    const user = await repoUser.findOne(id);

    const revenueTotal = await repoTransaction
      .createQueryBuilder("revenue")
      .select("SUM(revenue.value)", "total")
      .where("user_id = :id", { id: id })
      .andWhere("type = :type", { type: "revenue" })
      .getRawOne();

    const expenseTotal = await repoTransaction
      .createQueryBuilder("expense")
      .select("SUM(expense.value)", "total")
      .where("user_id = :id", { id: id })
      .andWhere("type = :type", { type: "expense" })
      .getRawOne();

    const entradas = revenueTotal.total
      ? parseFloat(revenueTotal.total.toFixed(2))
      : 0;
    const saidas = expenseTotal.total
      ? parseFloat(expenseTotal.total.toFixed(2))
      : 0;

    const total = entradas - saidas;

    return res.json({
      entradas,
      saidas,
      total,
      user: user,
    });
  } catch {
    return res.status(500).json({ message: "Error " });
  }
};
