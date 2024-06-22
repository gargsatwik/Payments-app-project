import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

const DB_URI = process.env.DB_URI;
const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("Paytm");
const collection = db.collection("Users");

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
