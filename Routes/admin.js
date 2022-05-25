import express from "express";
import client from "./../dbConnect.js";
import verifyJWT from "../Helper/tokenVerify.js";

const router = express.Router();

// // collection
const userCollection = client.db("inc-store").collection("users");

router.get("/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const user = await userCollection.findOne({ email: email });
  const isAdmin = user.roll === "admin";
  res.send({ admin: isAdmin });
});

export default router;
