import { Router } from "express";  
import { createSupermarket, getSupermarket, removeSupermarket, supermarketRegion, updateSupermarket } from "../controller/supermarket.js";
const router = Router()

router.delete("/remove/:id", removeSupermarket )
router.post("/add", createSupermarket )
router.put("/edit/:id", updateSupermarket )
router.get("/", getSupermarket )
router.get("/region",supermarketRegion)
export default router