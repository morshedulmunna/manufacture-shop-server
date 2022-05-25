import express from "express";
import client from "./../dbConnect.js";
const router = express.Router();
import verifyJWT from "../Helper/tokenVerify.js";
import { ObjectId } from "mongodb";
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
// Get All Order
router.get("/one/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const Order = await orderCollection.findOne({ _id: ObjectId(id) });
  res.send(Order);
});

export default router;
