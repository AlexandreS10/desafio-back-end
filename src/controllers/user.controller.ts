import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  public async create(req: Request, res: Response) {
    const { body } = req;

    const newUser = await userService.create(body);

    if (newUser) {
      return res.status(201).send({
        success: true,
        message: "User succesfully created.",
        data: { newUser },
      });
    }

    return res
      .status(404)
      .send({ success: false, message: "Error creating user." });
  }
}
export default UserController;
