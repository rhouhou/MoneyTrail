import Expense from "../models/expense.model.js";
import { errorHandler } from "../utils/error.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

export const createExpense = async (req, res, next) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid expense ID format"));
  }

  try{
     const existingExpense = await Expense.findById(req.params.id);
     if (!existingExpense) return next(errorHandler(404, "Expense not found"));

     await Expense.findByIdAndDelete(req.params.id);

     return res.status(200).json("Expense has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid expense ID format"));
  }
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true,
        runValidators: true,
       }
    );

    if (!updatedExpense) {
      return next(errorHandler(404, "Expense not found"));
    }
    
    return res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find()
    .sort({ createdAt: -1 })
    .select("-__v")
    .lean();
    return res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};
