import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  range: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: DataTypes.STRING
}, {
  timestamps: true
});


await User.sync();
