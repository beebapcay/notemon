import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  constructor(
    id: string,
    private email: string,
    private name: string,
    version: number,
  ) {
    super(id, version);
  }
}
