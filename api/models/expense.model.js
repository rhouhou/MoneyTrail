import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    dateOfExpense: {
      type: Date,
      required: [true, "Expense date is required"],
    },
    category: {
      type: String,
      required: [true, "Expense category is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Expense description is required"],
      trim: true,
    },
    weightInGrams: {
      type: Number,
      required: [true, "Weight is required"],
      min: [0, "Weight cannot be negative"],
    },
    paidInLL: {
      type: Number,
      required: [true, "Paid amount in LL is required"],
      min: [0, "Paid amount in LL cannot be negative"],
    },
    exchangeRate: {
      type: Number,
      required: [true, "Exchange rate is required"],
      min: [0, "Exchange rate cannot be negative"],
    },
    paidInUSD: {
      type: Number,
      required: [true, "Paid amount in USD is required"],
      min: [0, "Paid amount in USD cannot be negative"],
    },
    unitPriceInUSD: {
      type: Number,
      required: [true, "Unit price in USD is required"],
      min: [0, "Unit price in USD cannot be negative"],
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;