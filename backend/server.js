import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routes/index.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
