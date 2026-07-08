import Sale from "../models/sale.model.js";
import Expense from "../models/expense.model.js";

export const getAccountingSummary = async (req, res, next) => {
  try {
    const [salesSummary, expensesSummary] = await Promise.all([
      Sale.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalamount" },
            numberOfSales: { $sum: 1 },
          },
        },
      ]),
      Expense.aggregate([
        {
          $group: {
            _id: null,
            totalExpensesUSD: { $sum: "$paidInUSD" },
            totalExpensesLL: { $sum: "$paidInLL" },
            numberOfExpenses: { $sum: 1 },
          },
        },
      ]),
    ]);

    const sales = salesSummary[0] || {
      totalSales: 0,
      numberOfSales: 0,
    };

    const expenses = expensesSummary[0] || {
      totalExpensesUSD: 0,
      totalExpensesLL: 0,
      numberOfExpenses: 0,
    };

    return res.status(200).json({
      totalSales: sales.totalSales,
      totalExpensesUSD: expenses.totalExpensesUSD,
      totalExpensesLL: expenses.totalExpensesLL,
      numberOfSales: sales.numberOfSales,
      numberOfExpenses: expenses.numberOfExpenses,
    });
  } catch (error) {
    next(error);
  }
};