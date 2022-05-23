import express from "express";
import client from "./../dbConnect.js";

const router = express.Router();

// // collection
const productsCollection = client.db("inc-store").collection("products");

router.get("/", async (req, res) => {
  const products = await productsCollection.find({}).toArray();
  res.send(products);
});

export default router;
