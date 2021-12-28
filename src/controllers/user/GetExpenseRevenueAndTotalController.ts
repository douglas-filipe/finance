import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Revenues } from "../../entities/Revenue";
import { Expenses } from "../../entities/Expense";
import { Users } from "../../entities/User";

export const GetExpenseRevenueAndTotalController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoRevenue = await getRepository(Revenues);
    const repoUser = await getRepository(Users);
    const repoExpense = await getRepository(Expenses);

    const user = await repoUser.findOne(id);

    const revenueTotal = await repoRevenue
      .createQueryBuilder("revenue")
      .select("SUM(revenue.value)", "total")
      .where("user_id = :id", { id: id })
      .getRawOne();

    const expenseTotal = await repoExpense
      .createQueryBuilder("expense")
      .select("SUM(expense.value)", "total")
      .where("user_id = :id", { id: id })
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
