import  {Router} from "express" 
import { createCategory } from "../controller/category.js"
const router = Router()


router.post("/add", createCategory)


export default router