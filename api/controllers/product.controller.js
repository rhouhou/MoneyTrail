import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.json(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid product ID format"));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return next(errorHandler(404, "Product not found"));
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(400, "Invalid product ID format"));
  }

  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return next(errorHandler(404, "Product not found"));
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json("Product has been deleted!");
  } catch (error) {
    next(error);
  }
};