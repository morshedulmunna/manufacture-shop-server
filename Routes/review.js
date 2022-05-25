import express from "express";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";

const router = express.Router();

// // collection
const reviewsCollection = client.db("inc-store").collection("reviews");

//added new Product item with JWT Token Base ==========>
router.post("/", verifyJWT, async (req, res) => {
  const newReview = req.body;
  const result = await reviewsCollection.insertOne(newReview);
  res.send({ success: "Review Insert Successfully", result });
});

// Get All Review From Email
router.get("/", async (req, res) => {
  const result = await reviewsCollection.find({}).toArray();
  res.send(result);
});

export default router;
