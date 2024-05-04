import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

export const Region = sequelize.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
},{
  timestamps: true
});
