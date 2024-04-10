import prisma from "../database/prisma.database";
import User from "../models/user.model";
import { ResponseDto } from "./task.service";
import bcrypt from "bcrypt";

export interface CreateTaskDto {
  email: string;
  password: string;
}

class UserService {
  public async create(data: CreateTaskDto): Promise<ResponseDto> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = new User(data.email, passwordHash);

    await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    if (!newUser) {
      return {
        code: 404,
        message: "Error creating User",
      };
    }
    return {
      code: 201,
      message: "User created sucessfully",
      data: { newUser },
    };
  }
}

export default new UserService();
