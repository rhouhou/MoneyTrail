import Sale from "../models/sale.model.js";
import Expense from "../models/expense.model.js";

export const getAccountingSummary = async (req, res, next) => {
  try {
    const sales = await Sale.find();
    const expenses = await Expense.find();

    const totalSales = sales.reduce(
      (sum, sale) => sum + Number(sale.totalamount || 0),
      0
    );

    const totalExpensesUSD = expenses.reduce(
      (sum, expense) => sum + Number(expense.paidInUSD || 0),
      0
    );

    const totalExpensesLL = expenses.reduce(
      (sum, expense) => sum + Number(expense.paidInLL || 0),
      0
    );

    return res.status(200).json({
      totalSales,
      totalExpensesUSD,
      totalExpensesLL,
      numberOfSales: sales.length,
      numberOfExpenses: expenses.length,
    });
  } catch (error) {
    next(error);
  }
};