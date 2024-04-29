import { createCategoryService } from "../Services/Category.js";

export const createCategory = async(req, res)=>{
  console.log(req.body)
    const {name} = req.body
    try {
      const result = await createCategoryService(name)
        res.json(result)
      } catch (error) {
        console.log(error)
        res.send("Exist in dabatabase").status(500)
      }

}