import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
const app=express();
const PORT=process.env.PORT || 8000
//to parse the body of the request
app.use(express.json({limit:"10mb"}));
app.use(cookieParser())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/coupons",couponRoutes);
app.use("/api/payments",paymentRoutes);
app.listen(PORT,()=>{
    console.log("server running on port http://localhost:"+PORT);
    connectDB();
})