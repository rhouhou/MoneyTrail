import express from "express";
import { getAccountingSummary } from "../controllers/accounting.controller.js";

const router = express.Router();

router.get("/summary", getAccountingSummary);

export default router;