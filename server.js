import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

import productsRouters from "./Routes/products.js";

// Require ==========>
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middle-Ware
app.use(cors());
app.use(express.json());

// DB Connection
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hkk7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// Create DataBase Client======>>>
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Run funtion with try finnaly =====>>>>
const run = async () => {
  try {
    // Connect DataBase
    await client.connect();
    console.log("DB Connected");

    // Router
    app.use("/products", productsRouters);
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

// verify token function =======>>>
function verifyToken(token) {
  let email;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      email = "Invalid email";
    }
    if (decoded) {
      email = decoded;
    }
  });
  return email;
}
