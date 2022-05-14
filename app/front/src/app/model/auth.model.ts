import { RoleEnum } from '../enum/role.enum';

export class AuthModel {
  constructor(
    public name: string,
    public email: string,
    public token: string,
    public roles: RoleEnum[],
    public expiresIn: string,
    public refreshToken: string
  ) {
  }
}
