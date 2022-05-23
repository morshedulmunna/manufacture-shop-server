import express from "express";
import { ObjectId } from "mongodb";
import client from "./../dbConnect.js";

const router = express.Router();

// // collection
const productsCollection = client.db("inc-store").collection("products");

// Get All Products
router.get("/", async (req, res) => {
  const products = await productsCollection.find({}).toArray();
  res.send(products);
});

// API need to get specific user
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productsCollection.findOne({ _id: ObjectId(id) });
  res.send(result);
});

export default router;
