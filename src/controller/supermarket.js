import { find_custom_ProductSupermarket } from "../Services/Products.js";
import {
  CreateSupermarket,
  removeSupermarketService,
  findSupermarketByName,
  updateSupermarketService,
  getSupermarketService,
} from "../Services/Supermerket.js";
import { Supermarket } from "../models/Supermarket.model.js";

export const createSupermarket = async (req, res) => {
  const { logo, name } = req.body;
  if (name === undefined)
    return res.status(400).send("Error: El campo 'name' es obligatorio");
  const result = await findSupermarketByName(name);
  if (result)
    return res
      .status(400)
      .send("Error: Supermarket ya existe en Base de datos");
  const response = await CreateSupermarket(logo, name);
  res.json(response);
};


export const removeSupermarket = async (req, res)=>{
  const {id} = req.params
  const result = await removeSupermarketService(id)
  return result
}


export const updateSupermarket = async (req, res)=>{
  const {id} = req.params
  const {name} = req.body
  const resp = await updateSupermarketService(name, id)
  return  res.json(resp)
}


export const getSupermarket = async (req, res)=>{
  const resp = await getSupermarketService()
  return res.json(resp)
}

export const findSupermarket = async (req, res) => {
  const { name } = req.params;
  if (name === undefined || name === " ") return res.status(500);
  try {
    const result = await Supermarket.findAll({ name });
    return res.json(result);
  } catch (error) {
    res.status(500);
  }
};

export const findCartShop = async (req, res) => {
  const { ProductId } = req.body;
  const result = await find_custom_ProductSupermarket(ProductId);
  const groupedBySupermarket = {};
  result.forEach((entry) => {
    const supermarketName = entry.Supermarket.name;
    const productInfo = {
      id: entry.id,
      price: entry.price,
      offer: entry.offer,
      no_offer: entry.no_offer,
      url: entry.url,
      Product: entry.Product,
    };

    if (!groupedBySupermarket[supermarketName]) {
      groupedBySupermarket[supermarketName] = {
        name: supermarketName,
        products: [productInfo],
      };
    } else {
      groupedBySupermarket[supermarketName].products.push(productInfo);
    }
  });

  const output = Object.values(groupedBySupermarket);

  console.log(output)

  res.json(output);
};
