import csrf from "csrf";
import * as dotenv from "dotenv";

dotenv.config();

class CsrfTokenService {
  private csrfInstance: csrf;

  constructor() {
    this.csrfInstance = new csrf();
  }

  public generateToken() {
    const secret = process.env.CSRF_SECRET;
    if (secret === undefined) {
      throw new Error("CSRF secret is not defined in environment variables.");
    }
    return this.csrfInstance.create(secret);
  }

  public verifyToken(token: string) {
    const secret = process.env.CSRF_SECRET;
    if (secret === undefined) {
      throw new Error("CSRF secret is not defined in environment variables.");
    }
    return this.csrfInstance.verify(secret, token);
  }
}

export default new CsrfTokenService();
