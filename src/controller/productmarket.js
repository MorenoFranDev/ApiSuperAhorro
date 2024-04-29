import { Actualize_ProductSupermaket, Create_ProductSupermarket, createProduct, find_ProdMarket_ByName, find_ProductSupermarket } from "../Services/Products.js";
import { findRegionByName } from "../Services/Region.js";
import { findSupermarketByName } from "../Services/Supermerket.js";
import fs from 'fs/promises'
import { Op } from "sequelize"


export const createProductMarket = async (req, res) => {
  const { product_name, supermarket_name, price, offer, no_offer, product_img, url, region } = req.body;

  const { SupermarketId } = await findSupermarketByName(supermarket_name);
  const ProductId = await createProduct(product_name, product_img);
  const { RegionId } = await findRegionByName(region);


  if (SupermarketId === null) return res.status(400).send("No exite supermercado");
  if (RegionId === null) return res.status(400).send("No exite region");

  const product = await find_ProdMarket_ByName(ProductId, SupermarketId);

  if (product) {
    try {
      await Actualize_ProductSupermaket(price, offer, no_offer, ProductId, SupermarketId, RegionId)
      return res.json({ "msg": "Update succesfully" });
    } catch (error) {
      res.send("internal error").status(500)
    }
  } else {
    try {
      await Create_ProductSupermarket(price, offer, url, no_offer, ProductId, SupermarketId, RegionId);
      res.json({ "msg": "Create successfully" });
    } catch (error) {
      res.send("internal error").status(500)
    }
  }
};

export const findArticles = async (req, res) => {
  const { name, order, path, market } = req.query;
  let whereCondition = {};
  let whereCondition2 = {};

  if (name) {
    whereCondition2.name = name;
  }

  if (!path) {
    whereCondition2.name = { [Op.like]: `%${name}%` };
  }

  if (market) {
    const SupermarketId = await findMarket_id(market);
    whereCondition.SupermarketId = SupermarketId;
  }

  try {
    const result = await find_ProductSupermarket(whereCondition, whereCondition2);

    var supermarkets = [];
    result.forEach((element) => {
      const supermarketName = element.Supermarket.name;
      const supermarketId = element.Supermarket.id;
      const supermarketLogo = element.Supermarket.logo;
      if (
        !supermarkets.some(
          (supermarket) =>
            supermarket.name === supermarketName &&
            supermarket.id === supermarketId
        )
      ) {
        supermarkets.push({
          name: supermarketName,
          id: supermarketId,
          logo: supermarketLogo,
        });
      }
    });

    return res.json({ Pruducts: result, Supermarkets: supermarkets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProductList = async (req, res) => {
  let { filename } = req.file
  try {
    const result = await fs.readFile(`./uploads/${filename}`)
    const { products } = JSON.parse(result)
    products.map(async element => {
      const { product_name, supermarket_name, price, offer, no_offer, product_img, url, region } = element
      const { SupermarketId } = await findSupermarketByName(supermarket_name);
      const {ProductId} = await createProduct(product_name, product_img);
      const { RegionId } = await findRegionByName(region);

      const product = await find_ProdMarket_ByName(ProductId, SupermarketId);

      if (product) {
        try {
          await Actualize_ProductSupermaket(price, offer, no_offer, ProductId, SupermarketId, RegionId)
          console.log({ "msg": "Update succesfully" });
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await Create_ProductSupermarket(price, offer, url, no_offer, ProductId, SupermarketId, RegionId);
          console.log({ "msg": "Create successfully" });
        } catch (error) {
          console.log(error)
        }
      }
    })
    res.json("CREATE SUCCESSFULLY")
  } catch (error) {
    console.log(error)
  }
}