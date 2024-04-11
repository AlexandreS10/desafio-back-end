import { Router } from "express";
import UserController from "../controllers/user.controller";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController();

  router.post("/", controller.create);

  return router;
};
