import { Request, Response } from "express";
import taskService from "../services/task.service";

class TaskController {
  public async list(req: Request, res: Response) {
    const tasks = await taskService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "List of tasks", data: { tasks } });
  }

  public async create(req: Request, res: Response) {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: " Content camp requered",
      });
    }
    const task = await taskService.create({
      title,
      description,
    });

    return res.status(201).send({
      ok: true,
      message: "Task succesfully created ",
      data: { task },
    });
  }

  public async update(req: Request, res: Response) {
    const { idTask } = req.params;
    const { title, description } = req.body;
    try {
      const result = await taskService.update({
        idTask,
        title,
        description,
      });

      return res.status(200).send({
        success: true,
        message: "Task succesfully updated",
        data: { task: result },
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        message: "Erro ao atualizar Task",
        data: { error },
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { idTask } = req.params;

    try {
      await taskService.delete({ idTask });

      return res.status(200).send({
        success: true,
        message: "Task succesfully deleted",
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        message: "Erro ao deletar Task",
        data: { error },
      });
    }
  }
}
export default TaskController;
