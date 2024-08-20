import { Supermarket } from "../models/Supermarket.js";

export const CreateSupermarket = async (logo, name) => {
  try {
    return await Supermarket.findOrCreate({
      where: { name }, defaults: {
        logo,
        name
      }
    });
  } catch (error) {
    return null
  }
};

export const updateSupermarketService = async (name, id, logo, page) => {
  const result = await Supermarket.update({ name , logo, page }, { where: { id } })
  return result
}

export const getSupermarketService = async () => {
  const result = await Supermarket.findAll({ attributes: ["name", "id", "logo", "page"] })
  return result
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