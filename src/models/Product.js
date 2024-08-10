import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import { Supermarket } from "./Supermarket.js";
import { Region } from "./Region.js";
import { ProductMarket } from "./ProductMarket.js";
import { Category } from "./Category.js";

export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  img: DataTypes.STRING,
},{
  timestamps: true
});


    Supermarket.hasMany(ProductMarket);
    Product.hasMany(ProductMarket);
    Region.hasMany(ProductMarket);
    ProductMarket.belongsTo(Supermarket);
    ProductMarket.belongsTo(Product);
    Product.belongsTo(Category);