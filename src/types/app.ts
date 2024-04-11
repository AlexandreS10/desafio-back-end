import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { taskRoutes } from "../routes/task.routes";
import { userRoutes } from "../routes/user.routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes());
app.use("/tasks", taskRoutes());

export default app;
