import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_USER } from "./config.js";

const sequelize = new Sequelize(DATABASE_NAME,DATABASE_USER, DATABASE_PASS, {
  host: DATABASE_HOST,
  dialect: "postgres",
});

export default sequelize;