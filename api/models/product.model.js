import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Product ID is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    scent: {
      type: String,
      required: [true, "Scent is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      default: "colorless",
      trim: true,
    },
    productname: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
    },
    botlesize: {
      type: Number,
      required: [true, "Bottle size is required"],
      min: [0, "Bottle size cannot be negative"],
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: [0, "Cost cannot be negative"],
    },
    totalcost: {
      type: Number,
      required: [true, "Total cost is required"],
      min: [0, "Total cost cannot be negative"],
    },
    sellPriceUSDwithBottle: {
      type: Number,
      required: false,
      min: [0, "Selling price in USD with bottle cannot be negative"],
    },
    sellPriceLLwithBottle: {
      type: Number,
      required: [true, "Selling price in LL with bottle is required"],
      min: [0, "Selling price in LL with bottle cannot be negative"],
    },
    sellPriceUSDwithoutBottle: {
      type: Number,
      required: false,
      min: [0, "Selling price in USD without bottle cannot be negative"],
    },
    sellPriceLLwithoutBottle: {
      type: Number,
      required: [true, "Selling price in LL without bottle is required"],
      min: [0, "Selling price in LL without bottle cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;