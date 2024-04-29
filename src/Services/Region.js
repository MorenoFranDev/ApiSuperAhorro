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
  const result = await Region.findOne({
    where: { name }
  });
  if(result) return { name: result.name, RegionId: result.id };
  return null
};
