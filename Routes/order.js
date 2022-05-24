import express from "express";
import { ObjectId } from "mongodb";
import client from "./../dbConnect.js";

const router = express.Router();

// // collection
const productsCollection = client.db("inc-store").collection("Orders");

// //added new Product item with JWT Token Base ==========>
// app.post("/order", async (req, res) => {
//   const newProduct = req.body;
//   const tokenInfo = req.headers.authorization;
//   const [email, accessToken] = tokenInfo.split(" ");
//   const decoded = verifyToken(accessToken);

//   if (email === decoded.email) {
//     const result = await productsCollection.insertOne(newProduct);
//     res.send({ success: "Product Upload Successfully", result });
//   } else {
//     res.send({ success: "UnAuthoraized Access" });
//   }
// });
