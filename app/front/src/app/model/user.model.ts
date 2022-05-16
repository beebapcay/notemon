import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  constructor(
    id: string | null = null,
    public email: string | null = null,
    public name: string | null = null,
    version: number | null = null,
  ) {
    super(id, version);
  }
}
