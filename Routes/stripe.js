import express from "express";
const router = express.Router();
import verifyJWT from "../Helper/tokenVerify.js";

import Stripe from "stripe";
const stripe = Stripe(process.env.STRIP_SECRET_KEY);

router.post("/", verifyJWT, async (req, res) => {
  const { totalPrice } = req.body;
  const amount = totalPrice * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

export default router;
