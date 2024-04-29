import { Category } from "../models/Category.js";

export const createCategoryService = async (name)=>{
    try {
        const newCategory = new Category({ name });
        return await newCategory.save();
      } catch (error) {
        return error;
      }
}