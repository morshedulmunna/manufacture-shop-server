import express from "express";
import { ObjectId } from "mongodb";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";

const router = express.Router();

// // collection
const productsCollection = client.db("inc-store").collection("products");

// Get All Products
router.get("/", async (req, res) => {
  const products = await productsCollection.find({}).toArray();
  res.send(products.reverse());
});

// API need to get specific user
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productsCollection.findOne({ _id: ObjectId(id) });
  res.send(result);
});

// Product
router.post("/", verifyJWT, async (req, res) => {
  const newProduct = req.body;
  const result = await productsCollection.insertOne(newProduct);
  res.send({ success: "Product Upload Successfully", result });
});
// Product Delete
router.delete("/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const result = await productsCollection.deleteOne({ _id: ObjectId(id) });
  res.send({ success: "Product Upload Successfully", result });
});

export default router;
