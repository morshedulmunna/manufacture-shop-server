import express from "express";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const router = express.Router();

// // collection
const userCollection = client.db("inc-store").collection("users");

// Create users
router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const user = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };
  const result = await userCollection.updateOne(filter, updateDoc, options);
  console.log(result);

  const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  res.send({ result, token });
});

// Get user From Email
router.get("/", verifyJWT, async (req, res) => {
  const email = req.query.email;
  const result = await userCollection.findOne({ email: email });
  res.send(result);
});

export default router;
