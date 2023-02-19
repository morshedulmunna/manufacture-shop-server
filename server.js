import express from "express";
import cors from "cors";
import client from "./dbConnect.js";
const app = express();

// import verifyJWT from "./Helper/tokenVerify.js";
import productsRouters from "./Routes/products.js";
import loginRouters from "./Routes/login.js";
import ordersRouters from "./Routes/order.js";
import reviewRouters from "./Routes/review.js";
import userRouter from "./Routes/user.js";
import adminRouter from "./Routes/admin.js";
import stripeRoute from "./Routes/stripe.js";

// Require ==========>
const PORT = process.env.PORT || 5000;

// Middle-Ware
app.use(cors());
app.use(express.json());

// Database Run function with try Finlay =====>>>>
const run = async () => {
  try {
    // Connect DataBase
    await client.connect();

    // Router
    app.use("/products", productsRouters);
    app.use("/login", loginRouters);
    app.use("/orders", ordersRouters);
    app.use("/review", reviewRouters);
    app.use("/users", userRouter);
    app.use("/admin", adminRouter);
    app.use("/create-payment-intent", stripeRoute);
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send({
    message: "Running Server",
  });
});

app.listen(PORT, () => {
  console.log("server is running port", PORT);
});
