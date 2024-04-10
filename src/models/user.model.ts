import { v4 as createUuid } from "uuid";

class User {
  private _id: string;

  constructor(private _email: string, private _password: string) {
    this._id = createUuid();
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
