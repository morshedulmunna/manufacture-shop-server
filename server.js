import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import client from "./dbConnect.js";
const app = express();

// Import Router
import productsRouters from "./Routes/products.js";
import loginRouters from "./Routes/login.js";

// Require ==========>
const PORT = process.env.PORT || 5000;

// Middle-Ware
app.use(cors());
app.use(express.json());

// Database Run funtion with try finnaly =====>>>>
const run = async () => {
  try {
    // Connect DataBase
    await client.connect();
    console.log("DB Connected");

    // Router
    app.use("/products", productsRouters);
    app.use("/login", loginRouters);
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Runnig Server");
});

app.listen(PORT, () => {
  console.log("server is running port", PORT);
});
