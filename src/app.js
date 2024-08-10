import express from "express";
import session from "express-session";
import SupermarketRouter from "./router/supermarket.js";
import ProductMarketRouter from "./router/productmarket.js";
import ProductRegion from "./router/region.js";
import AuthRouter from "./router/auth.js";
import CategoryRouter from "./router/category.js";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import {
    AdminCorreo,
    AdminGoogleId,
    AdminPass,
    SecretCors,
    SecretSesionKey,
} from "./config.js";
import { User } from "./models/Users.js";
import { encryptPass } from "./middleware/bcrypt.js";
import { Supermarket } from "./models/Supermarket.js";
import { Product } from "./models/Product.js";
import { Category } from "./models/Category.js";
import { CartShop } from "./models/CartShop.js";
import { Region } from "./models/Region.js";
import { ProductMarket } from "./models/ProductMarket.js";
import sequelize from "./connection.js";
import("./models/Users.js");
const app = express();

app.use(cors({ origin: SecretCors }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(
    session({
        secret: SecretSesionKey,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }, // 1 hour
    })
);
app.use("/region", ProductRegion);
app.use("/supermarket", SupermarketRouter);
app.use("/product", ProductMarketRouter);
app.use("/category", CategoryRouter);
app.use("/auth", AuthRouter);


export default app;
