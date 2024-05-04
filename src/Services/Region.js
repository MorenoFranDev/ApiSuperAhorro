import { Region } from "../models/Region.js";

export const createRegionService = async (name) => {
  try {
    const newRegion = new Region({ name });
    return await newRegion.save();
  } catch (error) {
    return error;
  }
};

export const findRegionByName = async (name) => {
  const result = await Region.findOne({ where: { name } });
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