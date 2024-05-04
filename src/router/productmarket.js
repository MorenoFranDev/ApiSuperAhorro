import { createProductList, createProductMarket, findArticles } from "../controller/productmarket.js";
import { Router } from "express";
import { findCartShop } from "../controller/supermarket.js";
const router = Router();

router.get("/find",findArticles)
router.post("/add-json", createProductList)
router.post("/cartshop/",findCartShop)
export default router;
