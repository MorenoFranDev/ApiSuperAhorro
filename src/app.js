import express from "express";
import SupermarketRouter from "./router/supermarket.js";
import ProductMarketRouter from "./router/productmarket.js";
import ProductRegion from "./router/region.js";
import AuthRouter from "./router/auth.js"
import CategoryRouter from "./router/category.js";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import("./models/Users.js")
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize())

app.use("/region", ProductRegion );
app.use("/supermarket", SupermarketRouter);
app.use("/product",ProductMarketRouter);
app.use("/category",CategoryRouter);
app.use("/auth",AuthRouter);

app.get("/hello",(req, res)=>{
    res.json("EXITOSO")
})

export default app;
