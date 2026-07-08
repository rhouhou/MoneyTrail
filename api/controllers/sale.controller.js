import Sale from "../models/sale.model.js";
import { errorHandler } from "../utils/error.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

export const createSale = async (req, res, next) => {
  try {
    const sale = new Sale(req.body);
    const savedSale = await sale.save();

    return res.status(201).json(savedSale);
  } catch (error) {
    next(error);
  }
};

export const getSales = async (req, res, next) => {
  try {
    const sales = await Sale.find();

    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

export const updateSale = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid sale ID format"));
  }

  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSale) {
      return next(errorHandler(404, "Sale not found"));
    }

    return res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

export const deleteSale = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid sale ID format"));
  }

  try {
    const existingSale = await Sale.findById(req.params.id);

    if (!existingSale) {
      return next(errorHandler(404, "Sale not found"));
    }

    await Sale.findByIdAndDelete(req.params.id);

    return res.status(200).json("Sale has been deleted!");
  } catch (error) {
    next(error);
  }
};