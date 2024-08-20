import { Region } from "../models/Region.js";

export const createRegionService = async (name) => {
  try {
    return await Region.findOrCreate({ where: { name }, defaults: { name } });
  } catch (error) {
    return error;
  }
};

export const findRegionByName = async (name) => {
  // const result = (name) ? await Region.findOne({ where: { name } }) : await Region.findAll()
  const result =  await Region.findAll()
  console.log(result)
  if (result) return { "RegionId": result.id, "name": result.name };
  return null
};

export const removeRegionService = async (id) => {
  const result = await Region.remove({ where: { id } })
  return result
}

export const updateRegionService = async (name, id) => {
  const result = await Region.update({ name }, { where: { id } })
  return result
}