import express from "express";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";
import verifyAdmin from "../Helper/verifyAdmin.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const router = express.Router();

// // collection
const userCollection = client.db("inc-store").collection("users");

// Create users ====>>
router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const user = req.body;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };
  const result = await userCollection.updateOne(filter, updateDoc, options);

  const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  res.send({ result, token });
});

// Get All Users
router.get("/", verifyJWT, async (req, res) => {
  const result = await userCollection.find({}).toArray();
  res.send(result.reverse());
});
// Get user From Email
router.get("/one", verifyJWT, async (req, res) => {
  const email = req.query.email;

  const result = await userCollection.findOne({ email: email });
  res.send(result);
});

// Create With Admin Access users ====>>
router.put("/admin/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const requester = req.decoded.email;
  const requesterAccount = await userCollection.findOne({ email: requester });
  if (requesterAccount.roll === "admin") {
    const filter = { email: email };
    const updateDoc = {
      $set: { roll: "admin" },
    };
    const result = await userCollection.updateOne(filter, updateDoc);

    res.send({ result });
  } else {
    res.status(403).send({ message: "forbidden" });
  }
});
export default router;
