import { SecretJWT } from "../config.js";
import { getFind } from "../Services/Category.js";
import { Actualize_ProductSupermaket, Create_ProductSupermarket, createProduct, find_custom_ProductSupermarket, find_ProdMarket_ByName, find_ProductSupermarket_category, find_ProductSupermarket_name, service_create_cartshop, service_user_cartshop } from "../Services/Products.js";
import { findRegionByName } from "../Services/Region.js";
import { findSupermarketByName } from "../Services/Supermerket.js";
import jwt from "jsonwebtoken"


export const createProductMarket = async (req, res) => {
  const { product_name, supermarket_name, price, offer, no_offer, product_img, url, region } = req.body;

  const { SupermarketId } = await findSupermarketByName(supermarket_name);
  const { ProductId } = await createProduct(product_name, product_img);
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
  const { name, order, market, category } = req.query;
  const page = (req.query.page === undefined) ? 1 : req.query.page
  var result;
  let whereSupermarket

  if (market) {
    const { SupermarketId } = await findSupermarketByName(market);
    whereSupermarket = SupermarketId
  }

  if (name) {
    const resultQuery = await find_ProductSupermarket_name(whereSupermarket, name, page, order);
    result = resultQuery;
  }

  if (category) {
    const { CategoryId } = await getFind(category)
    const resultQuery = await find_ProductSupermarket_category(whereSupermarket, CategoryId, page, order);
    result = resultQuery;
  }

  try {
    return res.json({ Products: result.rows, Pages: Math.ceil(result.count / 20) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProductList = async (req, res) => {
  const { product_name, supermarket_name, price, offer, no_offer, product_img, url, region, Categoria } = req.body
  const { CategoryId } = await getFind(Categoria)
  const { SupermarketId } = await findSupermarketByName(supermarket_name);
  const { ProductId } = await createProduct(product_name, product_img, CategoryId);
  const { RegionId } = await findRegionByName(region);
  const product = await find_ProdMarket_ByName(ProductId, SupermarketId);
  if (product) {
    try {
      await Actualize_ProductSupermaket(price, offer, no_offer, ProductId, SupermarketId, RegionId)
      res.json({ "msg": "Update succesfully" });
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      await Create_ProductSupermarket(price, offer, url, no_offer, ProductId, SupermarketId, RegionId);
      res.json({ "msg": "Create successfully" });
    } catch (error) {
      console.log(error)
    }
  }
}


export const create_cartshop = async (req, res) => {
  try {
    const Authorization = req.body.Authorization.split(" ")[1];
    const token = jwt.verify(Authorization, SecretJWT);
    const UserId = token.UserId
    const ProductId = req.body.ProductId.map((element) => ({
      id: element.id,
      quantity: element.quantity
    })
    )
    if(!UserId) return res.status(500).send("Error in UserId") 
    
    const cart = await service_create_cartshop(JSON.stringify(ProductId), UserId)
    res.json(cart)
  } catch (error) {
    res.status(500).json("Error en credenciales o base de datos")
  }
}


export const get_cartshop = async (req, res) => {
  try {
    const Authorization = req.headers["authorization"].split(" ")[1];
    const token = jwt.verify(Authorization, SecretJWT);
    const UserId = token.UserId
    const { ElementsCart } = await service_user_cartshop(UserId)
    const substrings = JSON.parse(ElementsCart);
    const arrayProductsId = substrings.map((element) => element.id)
    const result = await find_custom_ProductSupermarket(arrayProductsId);
    const groupedBySupermarket = {};
    result.forEach((entry) => {
      const supermarketName = entry.Supermarket.name;
      const supermarketPage = entry.Supermarket.page;
      const supermarketlogo = entry.Supermarket.logo;
      const productInfo = {
        quantity: substrings.find(item => entry.Product.id == item.id)?.quantity,
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
    console.log(groupedBySupermarket)
    const output = Object.values(groupedBySupermarket);
    res.status(200).json(output);
  } catch (error) {
    console.log(error)
    res.status(500).json("Error en database or credentials")
  }
}