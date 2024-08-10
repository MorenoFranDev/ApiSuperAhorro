import { create_cartshop, createProductList, createProductMarket, findArticles } from "../controller/productmarket.js";
import { Router } from "express";
import { findCartShop } from "../controller/supermarket.js";
import { JWT_Decode_admin, JWT_Decode_user } from "../middleware/jwt_token.js";
const router = Router();

router.get("/find", findArticles)
router.post("/add-json", JWT_Decode_admin, createProductList)
router.post("/cartshop", findCartShop)
router.post("/create-cartshop",JWT_Decode_user, create_cartshop)
export default router;

