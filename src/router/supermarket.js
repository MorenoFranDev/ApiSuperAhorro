import { Router } from "express";  
import { createSupermarket, getSupermarket, removeSupermarket, supermarketRegion, updateSupermarket } from "../controller/supermarket.js";
import { JWT_Decode_admin } from "../middleware/jwt_token.js";
const router = Router()

router.delete("/remove/:id",JWT_Decode_admin, removeSupermarket )
router.post("/add",JWT_Decode_admin, createSupermarket )
router.put("/edit/:id",JWT_Decode_admin, updateSupermarket )
router.get("/", getSupermarket )
router.get("/region",supermarketRegion)

export default router