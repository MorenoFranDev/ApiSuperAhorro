import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
sequelize.sync()

export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  img: DataTypes.STRING,
});

