import prisma from "../database/prisma.database";
import { User } from "../models/user.model";


export interface CreateUserDto {
    email: string;
    password: string;
  }


class UserService{
    public async create(data: CreateUserDto){
        const newUser = new User(
            data.email,
            data.password
        );
        await prisma.user.create({
            data:{
                id: newUser.id,
                email:newUser.email,
                password:newUser.password
            },
        });
        return newUser;
    }
}
export default new UserService();