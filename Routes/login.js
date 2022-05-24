import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Email Post Token JWt Create
router.post("/", async (req, res) => {
  const email = req.body;
  console.log(email);

  var token = jwt.sign(email, process.env.ACCESS_TOKEN);
  res.send({ token });
});

export default router;
