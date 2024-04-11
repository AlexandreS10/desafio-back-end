import prisma from "../database/prisma.database";

export interface CreateTaskDto {
  idUser: string;
  title: string;
  description: string;
}
export interface ResponseDto {
  code: number;
  message: string;
  data?: any;
}
export interface UpdateTaskDto {
  idUser: string;
  idTask: string;
  title?: string;
  description?: string;
}

export interface FoundTaskDto {
  idUser: string;
  idTask: string;
}

class TaskService {
  public async findAll(): Promise<any> {
    const data = await prisma.task.findMany({});

    return data;
  }

  public async create(data: CreateTaskDto): Promise<ResponseDto> {
    const criacaoTask = await prisma.task.create({
      data: {
        idUser: data.idUser,
        title: data.title,
        description: data.description,
      },
    });

    return {
      code: 201,
      message: "Task created sucessfully",
      data: criacaoTask,
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
        idUser: data.idUser,
        title: data.title,
        description: data.description,
      },
    });

    return {
      code: 200,
      message: "Task updated succesfully",
      data: atualizarTask,
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
