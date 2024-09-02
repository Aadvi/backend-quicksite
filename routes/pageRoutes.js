import express from "express";
import { getPages, createPage } from "../controllers/pageController.js";

const router = express.Router();

router.get("/pages", getPages);
router.post("/pages", createPage);

export default router;
