import { createCategoryService, deletCategoryService, getCategoryService, updateCategoryService } from "../Services/Category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body
  try {
    const result = await createCategoryService(name)
    res.json(result)
  } catch (error) {
    console.log(error)
    res.send("Exist in dabatabase").status(500)
  }

}
export const updateCategory = async(req, res)=>{
  const { id } = req.params
  const { name } = req.body
  const result = await updateCategoryService(id,name)
  return res.json(result)
} 

export const deleteCategory = async (req, res)=>{
  const id = req.params.id
  const result = deletCategoryService(id)
  return res.json(result)
}

export const getCategory = async (req, res) => {
  const result = await getCategoryService()
  return res.json(result)
}