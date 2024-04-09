import prisma from "../database/prisma.database";

export interface CreateTaskDto {
  title: string;
  description: string;
}
export interface ResponseDto {
  code: number;
  message: string;
  data?: any;
}
export interface UpdateTaskDto {
  idTask: string;
  title?: string;
  description?: string;
}

export interface FoundTaskDto {
  idTask: string;
}

class TaskService {
  public async findAll(): Promise<any> {
    const data = await prisma.task.findMany({});

    return data;
  }

  public async listById(idTask: string): Promise<ResponseDto> {
    // 1- validar se a task existe
    const task = await prisma.task.findUnique({
      where: {
        id: idTask,
      },
    });

    if (!task) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    return {
      code: 200,
      message: "Task successfully listed",
      data: task,
    };
  }
  public async create(data: CreateTaskDto): Promise<ResponseDto> {
    const criacaoTask = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return {
      code: 201,
      message: "Task created sucessfully",
      data: criacaoTask.toJson(),
    };
  }

  public async update(data: UpdateTaskDto): Promise<ResponseDto> {
    const taskEncontrada = await prisma.task.findUnique({
      where: {
        id: data.idTask,
      },
    });
    if (!taskEncontrada) {
      return {
        code: 404,
        message: "Task not found",
      };
    }

    const atualizarTask = await prisma.task.update({
      where: {
        id: data.idTask,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return {
      code: 200,
      message: "Task updated succesfully",
      data: atualizarTask.toJson(),
    };
  }
  public async delete(data: FoundTaskDto): Promise<ResponseDto> {
    const taskEncontrada = await prisma.task.findUnique({
      where: {
        id: data.idTask,
      },
    });

    if (!taskEncontrada) {
      return {
        code: 404,
        message: "Task not found",
      };
    }
    await prisma.task.delete({
      where: {
        id: data.idTask,
      },
    });

    return {
      code: 200,
      message: "Task successfully deleted",
    };
  }
}
export default new TaskService();
