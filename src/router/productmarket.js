import { create_cartshop, createProductList, createProductMarket, findArticles, get_cartshop } from "../controller/productmarket.js";
import { Router } from "express";
import { findCartShop } from "../controller/supermarket.js";
import { JWT_Decode_admin, JWT_Decode_user } from "../middleware/jwt_token.js";
const router = Router();

router.get("/find", findArticles)
router.post("/add-json", JWT_Decode_admin, createProductList)
router.post("/cartshop", findCartShop)
router.post("/create-cartshop",JWT_Decode_user, create_cartshop)
router.get("/user-cartshop",JWT_Decode_user, get_cartshop)
export default router;

