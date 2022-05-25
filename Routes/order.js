import express from "express";
import client from "./../dbConnect.js";
const router = express.Router();
import verifyJWT from "../Helper/tokenVerify.js";
// collection
const orderCollection = client.db("inc-store").collection("Orders");

//added new Product item with JWT Token Base ==========>
router.post("/userOrder", verifyJWT, async (req, res) => {
  const newProduct = req.body;
  const result = await orderCollection.insertOne(newProduct);
  res.send({ success: "Product Upload Successfully", result });
});
// Get Order List
router.get("/userOrder", verifyJWT, async (req, res) => {
  const OrderUser = req.query.orderUser;
  const decodedEmail = req.decoded.email;
  if (OrderUser === decodedEmail) {
    const query = { email: OrderUser };
    const Orders = await orderCollection.find(query).toArray();
    return res.send(Orders);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
});

// Get All Order
router.get("/allOrder", verifyJWT, async (req, res) => {
  const allOrder = await orderCollection.find({}).toArray();
  res.send(allOrder);
});

export default router;
