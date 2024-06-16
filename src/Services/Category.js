import { Category } from "../models/Category.js";

export const createCategoryService = async (name) => {
  try {
    const newCategory = new Category({ name });
    return await newCategory.save();
  } catch (error) {
    return error;
  }
}

export const getFind = async (name) => {
  try {
    const result = await Category.findOne({ where: { name }, attributes: ["name", "id"] })
    return { "CategoryId": result.id, "name": result.name }
  } catch (error) {
    
  }
}

export const getCategoryService = async () => {
  const result = await Category.findAll({ attributes: ["name", "id"] })
  return result
}

export const deletCategoryService = async (id) => {
  const result = await Category.destroy({ where: { id } })
  return result
}
export const updateCategoryService = async (id, name) => {
  try {
    const result = await Category.update({ name }, { where: { id } })
    return result
  } catch (error) {
    throw new error
  }
}