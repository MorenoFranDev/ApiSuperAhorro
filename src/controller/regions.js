import { createRegionService, findRegionByName } from "../Services/Region.js";

export const createRegion = async (req, res) => {
  const { name } = req.body;
  try {
    await createRegionService(name)
    res.json("Create successfully")
  } catch (error) {
    res.send("Exist in dabatabase").status(500)
  }
};

export const getRegions = async(req, res)=>{
  const { name } = req.body;
  const result = findRegionByName(name)
  res.json(result)
}