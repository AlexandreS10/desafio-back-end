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
    const idUser = req.authUser.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: " Content camp requered",
      });
    }
    const task = await taskService.create({
      idUser: idUser,
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
    const { id } = req.authUser;
    const { title, description } = req.body;
    try {
      const result = await taskService.update({
        idUser: id,
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
        message: "Error updating task",
        data: { error },
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { idTask } = req.params;
    const { id } = req.authUser;

    try {
      await taskService.delete({ idTask, idUser: id });

      return res.status(200).send({
        success: true,
        message: "Task succesfully deleted",
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        message: "Error deleted Task",
        data: { error },
      });
    }
  }
}
export default TaskController;
