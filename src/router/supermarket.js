import { Router } from "express";  
import { createSupermarket } from "../controller/supermarket.js";
const router = Router()

router.post("/add", createSupermarket )

export default router