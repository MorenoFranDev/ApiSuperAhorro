import { Supermarket } from "../models/Supermarket.model.js";

export const CreateSupermarket = async (logo, name) => {
  try {
    const newSupermarket = new Supermarket({
      logo,
      name,
    });
    const result = await newSupermarket.save();
    return result
  } catch (error) {
    return null
  }
};

export const updateSupermarketService = async (name, id) => {
  const result = await Supermarket.update({ name }, { where: { id } })
  return result
}

export const getSupermarketService = async () => {
  const result = await Supermarket.findAll({ attributes: ["name", "id"] })
  return {
    "SupermarketId": result.id,
    "name": result.name
  }
}

export const findSupermarketByName = async (name) => {
  const result = await Supermarket.findOne({
    where: { name },
  });
  if (result) return { SupermarketId: result.id, name: result.name, logo: result.logo };
  return null;
};

export const removeSupermarketService = async (req, res) => {
  const result = await Supermarket.destroy({ where: { id } })
  return res.json(result)
}