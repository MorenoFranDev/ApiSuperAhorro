import { Op } from "sequelize";
import { Product } from "../models/Product.js";
import { ProductMarket } from "../models/ProductMarket.js";
import { Supermarket } from "../models/Supermarket.js";
import { User } from "../models/Users.js";
import { CartShop } from "../models/CartShop.js";

export const createProduct = async (product_name, img, CategoryId) => {
  const find = await findProductByName(product_name);
  if (find !== null) return { ProductId: find.ProductId };
  try {
    const insert = new Product({
      name: product_name,
      img,
      CategoryId
    });
    const result = await insert.save();
    return {
      name: result.name,
      ProductId: result.id,
      img: result.img,
    };
  } catch (e) {
    return null;
  }
};

export const findProductByName = async (name) => {

  const find = await Product.findOne({
    where: { name }
  });

  if (find !== null) return { ProductId: find.id, name: find.name, img: find.logo };
  return null
};

export const find_ProdMarket_ByName = async (ProductId, SupermarketId) => {
  const result = await ProductMarket.findOne({
    where: { ProductId, SupermarketId },
  });
  if (result) return result.id;
  return null;
};

export const Create_ProductSupermarket = async (price, offer, url, no_offer, ProductId, SupermarketId, RegionId) => {
  const insert = new ProductMarket({
    price,
    offer,
    url,
    no_offer,
    ProductId,
    SupermarketId,
    RegionId,
  });
  return insert.save();
};

export const Actualize_ProductSupermaket = async (price, offer, no_offer, ProductId, SupermarketId, RegionId) => {
  await ProductMarket.update(
    {
      price,
      offer,
      no_offer,
    },
    { where: { ProductId, SupermarketId, RegionId } }
  );
};


export const find_ProductSupermarket_name = async (whereSupermarket, name, page,order) => {
  const queryOptions = {
    include: [
      {
        model: Product,
        where: { name: { [Op.iLike]: `%${name}%` } }, 
      },
      { model: Supermarket, attributes: ["name", "logo"] },
    ],
    offset: (page - 1) * 20,
    limit: 20
  };
  if (order) {
    queryOptions.order = [['price', order]];
  }
  if(whereSupermarket){
    queryOptions.where = {SupermarketId: whereSupermarket}
  }
  const result = await ProductMarket.findAndCountAll(queryOptions);
  return result;
};

export const find_ProductSupermarket_category = async (whereSupermarket, whereCategory, page,order) => {
  const queryOptions = {
    include: [
      {
        model: Product,
        where: { CategoryId: whereCategory }, 
      },
      { model: Supermarket, attributes: ["name", "logo"] },
    ],
    offset: (page - 1) * 20,
    limit: 20
  };
  if(whereSupermarket){
    queryOptions.where = {SupermarketId: whereSupermarket}
  }
  if (order) {
    queryOptions.order = [['price', order]];
  }
  const result = await ProductMarket.findAndCountAll(queryOptions);
  return result;
};

export const find_custom_ProductSupermarket = async (ProductId, SupermarketId) => {
  const result = await ProductMarket.findAll({
    include: [
      { model: Supermarket, attributes: ["name", "id","page","logo"] },
      { model: Product, attributes: ["name", "id"] },
    ],
    where: { ProductId },
    attributes: ["id", "price", "offer", "no_offer", "url"],
  });
  return result

}


export const service_create_cartshop = async (list, UserId)=>{
  const newlist = {
    UserId,
    ElementsCart: list.join(", ")
  }
  const cart = new CartShop(newlist) 
  return await cart.save()
}

export const service_user_cartshop = async(UserId)=>{
  return await CartShop.findOne({where: {UserId}})
} 