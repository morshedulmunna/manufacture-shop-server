import express from "express";
import client from "./../dbConnect.js";
const router = express.Router();
import verifyJWT from "../Helper/tokenVerify.js";
// collection
const orderCollection = client.db("inc-store").collection("Orders");

//added new Product item with JWT Token Base ==========>
router.post("/", verifyJWT, async (req, res) => {
  const newProduct = req.body;
  const result = await orderCollection.insertOne(newProduct);
  res.send({ success: "Product Upload Successfully", result });
});

export default router;
