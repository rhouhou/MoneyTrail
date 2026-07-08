import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    transactions: {
      type: String,
      unique: true,
      required: [true, "Transaction ID is required"],
      trim: true,
    },
    dateOfPurchase: {
      type: Date,
      required: [true, "Purchase date is required"],
    },
    businessType: {
      type: String,
      required: [true, "Business type is required"],
      trim: true,
    },
    productname: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    isWithBottle: {
      type: String,
      required: [true, "Bottle option is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    unitprice: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Unit price cannot be negative"],
    },
    totalamount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;