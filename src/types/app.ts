import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { taskRoutes } from "../routes/task.routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());
app.use("/tasks", taskRoutes());

export default app;
