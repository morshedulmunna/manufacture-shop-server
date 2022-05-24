import express from "express";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";

const router = express.Router();

// // collection
const userCollection = client.db("inc-store").collection("users");

router.get("/", async (req, res) => {
  const allUsers = await userCollection.find({}).toArray();
  res.send(allUsers);
});

//added new Product item with JWT Token Base ==========>
router.put("/", verifyJWT, async (req, res) => {
  const newUser = req.body;
  const result = await userCollection.insertOne(newUser);
  res.send({ success: "Review Insert Successfully", result });
});

export default router;
