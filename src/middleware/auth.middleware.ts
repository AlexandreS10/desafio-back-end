import { NextFunction, Request, Response } from "express";
import csrfService from "../services/csrf.service";

export class AuthMiddleware {
  public async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res
          .status(401)
          .send({ success: false, message: "Check email or password" });
      }

      const token = authorization.split(" ")[1];

      const isTokenValid = csrfService.verifyToken(token);

      if (!isTokenValid) {
        return res
          .status(403)
          .send({ success: false, message: "Token CSRF invalid" });
      }

      req.authUser;

      next();
    } catch (error) {
      return res
        .status(401)
        .send({ success: false, message: "Check email or password", error });
    }
  }
}
export default AuthMiddleware;
