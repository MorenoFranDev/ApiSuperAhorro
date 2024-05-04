import { createRegion, getRegions, removeRegion, updateRegion } from "../controller/regions.js";
import { Router } from "express";
const router = Router();

router.post("/add",createRegion)
router.delete("/remove/:id", removeRegion)
router.put("/edit/:id", updateRegion)
router.get("/",getRegions)
export default router;
