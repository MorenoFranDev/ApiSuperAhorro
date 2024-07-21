import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

export const CartShop = sequelize.define("CartShop", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ElementsCart: DataTypes.STRING,
},{
  timestamps: true
});


