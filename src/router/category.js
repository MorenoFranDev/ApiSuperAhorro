import  {Router} from "express" 
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controller/category.js"
import { JWT_Decode_admin } from "../middleware/jwt_token.js"
const router = Router()


router.post("/add",JWT_Decode_admin, createCategory)
router.delete("/remove/:id",JWT_Decode_admin, deleteCategory)
router.put("/edit/:id",JWT_Decode_admin, updateCategory)
router.get("/", getCategory)


export default router