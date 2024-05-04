import  {Router} from "express" 
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controller/category.js"
const router = Router()


router.post("/add", createCategory)
router.delete("/remove/:id", deleteCategory)
router.put("/edit/:id",updateCategory)
router.get("/", getCategory)


export default router