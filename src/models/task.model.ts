export class Task {
    constructor(
        private _id: string,
        private _idUser: string,
        private _title: string,
        private _description: string
    ){

    }
    public get id() {
        return this._id;
      }
      public get idUser() {
        return this._idUser;
      }
    
      public get title() {
        return this._title;
      }
      public get description() {
        return this._description;
      }
      public toJson() {
        return {
          id: this._id,
          idUser: this._idUser,
          title: this._title,
          description: this._description,
        };
      }
}