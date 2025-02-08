import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import routes from "./src/routes";
import morgan from "morgan";
import endpointList from "express-list-endpoints";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

export const prisma = new PrismaClient();

app.use("/api/speakio", routes);

// Log all endpoints
console.log(endpointList(app));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});