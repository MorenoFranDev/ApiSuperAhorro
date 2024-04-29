import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
sequelize.sync()

export const ProductMarket = sequelize.define("ProductMarket", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  offer: {
    type: DataTypes.STRING,
  },
  no_offer: {
    type: DataTypes.FLOAT,
  },
  url: {
    type: DataTypes.STRING,
  }
});


