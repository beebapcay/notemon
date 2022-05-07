import { RoleEnum } from '../enum/role.enum';

export class AuthModel {
  constructor(
    public name: string,
    public email: string,
    public token: string,
    public refreshToken: string,
    public roles: RoleEnum[]
  ) {
  }
}
