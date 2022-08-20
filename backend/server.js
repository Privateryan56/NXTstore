import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from "path";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://nxtstore.herokuapp.com" }));


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const __dirname=path.resolve();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'/frontend/build')));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else{
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
