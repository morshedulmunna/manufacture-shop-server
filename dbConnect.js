import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Require ==========>
dotenv.config();

// DB Connection here
const URI = process.env.MONGODB_URL;

// Create DataBase Client======>>>
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
