import { v4 as createUuid } from "uuid";
import { Task } from "./task.model";

class User {
  private _id: string;
  public task: Task[];
  constructor(private _email: string, private _password: string) {
    this._id = createUuid();
    this.task = [];
  }

  public get id() {
    return this._id;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }
}

export default User;
