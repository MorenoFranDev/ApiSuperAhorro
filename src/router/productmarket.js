import { createProductList, createProductMarket, findArticles } from "../controller/productmarket.js";
import { Router } from "express";
import { findCartShop } from "../controller/supermarket.js";
import upload from "../libs/uploadsFile.js";
const router = Router();

router.post("/add", createProductMarket);
router.get("/find",findArticles)
router.post("/add-json", upload.single('file'), createProductList)
// router.post("/add-json",createProductList)
router.post("/cartshop/",findCartShop)
export default router;
