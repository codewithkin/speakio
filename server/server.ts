import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import routes from "./src/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

export const prisma = new PrismaClient();

app.get("/api/speakio", routes)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
