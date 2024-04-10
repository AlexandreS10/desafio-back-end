import { Router } from "express";
import TaskController from "../controllers/task.controller";
import AuthMiddleware from "../middleware/auth.middleware";

export const taskRoutes = () => {
  const router = Router();
  const controller = new TaskController();
  const authMiddleware = new AuthMiddleware();

  router.post("/", authMiddleware.checkUser, controller.create);

  router.get("/", authMiddleware.checkUser, controller.list);
  router.put("/:idTask", authMiddleware.checkUser, controller.update);
  router.delete("/:idTask", authMiddleware.checkUser, controller.delete);

  return router;
};
