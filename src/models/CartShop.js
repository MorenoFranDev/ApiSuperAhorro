import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import { User } from "./Users.js";
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

CartShop.belongsTo(User)
CartShop.sync()

