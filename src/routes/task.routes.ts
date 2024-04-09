import { Router } from "express";
import TaskController from "../controllers/task.controller";

export const taskRoutes = () => {
  const router = Router();
  const controller = new TaskController();

  router.post("/", controller.create);

  router.get("/", controller.list);
  router.put("/:idTask", controller.update);
  router.delete("/:idTask", controller.delete);

  return router;
};
