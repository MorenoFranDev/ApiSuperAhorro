import { createRegionService, findRegionByName, removeRegionService, updateRegionService } from "../Services/Region.js";

export const createRegion = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await createRegionService(name)
    res.json(result)
  } catch (error) {
    res.send("Exist in dabatabase").status(500)
  }
};

export const getRegions = async(req, res)=>{
  const result = await findRegionByName()
  return res.json(result)
}


export const removeRegion = async(req, res)=>{
   const {id}=req.params
   const result = await removeRegionService(id)
   res.json( result)
}

export const updateRegion = async (req, res)=>{
  const {name} = req.body
  const {id} = req.params
  const result = await updateRegionService(name,id);
  res.json(result)
}