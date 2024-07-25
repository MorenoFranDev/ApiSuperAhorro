import { create_cartshop, createProductList, createProductMarket, findArticles } from "../controller/productmarket.js";
import { Router } from "express";
import { findCartShop } from "../controller/supermarket.js";
const router = Router();

router.get("/find",findArticles)
router.post("/add-json", createProductList)
router.post("/cartshop/",findCartShop)
router.post("/create-cartshop",create_cartshop)
export default router;
