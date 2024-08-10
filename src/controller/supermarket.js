import { find_custom_ProductSupermarket } from "../Services/Products.js";
import {
  CreateSupermarket,
  removeSupermarketService,
  findSupermarketByName,
  updateSupermarketService,
  getSupermarketService,
} from "../Services/Supermerket.js";
import { Supermarket } from "../models/Supermarket.js";


export const supermarketRegion = async (req, res) => {
  const { id } = req.params
  const resp = await Supermarket.findAll()
  res.json(resp)
  console.log(resp)
}

export const createSupermarket = async (req, res) => {
  const { logo, name } = req.body;
  if (name === undefined) return res.status(400).send("Error: El campo 'name' es obligatorio");
  const response = await CreateSupermarket(logo, name);
  res.json(response);
};


export const removeSupermarket = async (req, res) => {
  const { id } = req.params
  const result = await removeSupermarketService(id)
  return result
}


export const updateSupermarket = async (req, res) => {
  const { id } = req.params
  const { name, logo, page } = req.body
  const resp = await updateSupermarketService(name, id, logo,page)
  return res.json(resp)
}


export const getSupermarket = async (req, res) => {
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
  const arrayProductsId = ProductId.map((element) => element.id)
  const result = await find_custom_ProductSupermarket(arrayProductsId);
  const groupedBySupermarket = {};
  result.forEach((entry) => {
    const supermarketName = entry.Supermarket.name;
    const supermarketPage = entry.Supermarket.page;
    const supermarketlogo = entry.Supermarket.logo;
    const productInfo = {
      quantity: ProductId.find(item => entry.Product.id == item.id)?.quantity,
      id: entry.id,
      price: entry.price,
      offer: entry.offer,
      no_offer: entry.no_offer,
      url: entry.url,
      Product: entry.Product,
    };
    if (!groupedBySupermarket[supermarketName]) {
      groupedBySupermarket[supermarketName] = {
        logo: supermarketlogo,
        page: supermarketPage,
        name: supermarketName,
        products: [productInfo],
      };
    } else {
      groupedBySupermarket[supermarketName].products.push(productInfo);
    }
  });

  const output = Object.values(groupedBySupermarket);
  res.json(output);
};
