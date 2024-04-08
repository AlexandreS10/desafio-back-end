import { Request, Response } from "express";
import userService from "../services/user.service";

 export class UserController{
    public async create(req:Request,res:Response){
        const {body} = req

        const newUser = await userService.create(body)

        if (newUser) {
            return res.status(201).send({
              ok: true,
              message: "User succesfully created ",
              data: newUser,
            });
          }
      
          res.status(500).send({
            ok: false,
            message: "Erro ao criar Usuário",
          });
    }
 }