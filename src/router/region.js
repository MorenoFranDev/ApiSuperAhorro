import { createRegion, getRegions, removeRegion, updateRegion } from "../controller/regions.js";
import { Router } from "express";
import { JWT_Decode_admin } from "../middleware/jwt_token.js";
const router = Router();

router.post("/add",JWT_Decode_admin,createRegion)
router.delete("/remove/:id",JWT_Decode_admin, removeRegion)
router.put("/edit/:id",JWT_Decode_admin, updateRegion)
router.get("/",getRegions)

export default router;
