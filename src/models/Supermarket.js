import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import { ProductMarket } from "./ProductMarket.js";
import { Product } from "./Product.js";
import { Region } from "./Region.js";
import { Category } from "./Category.js";

export const Supermarket = sequelize.define("Supermarket", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  page: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logo: {
    type: DataTypes.STRING,
  },
},{
  timestamps: true
});
