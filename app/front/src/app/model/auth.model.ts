import { RoleEnum } from '../enum/role.enum';

export class AuthModel {
  constructor(
    public name: string | null = null,
    public email: string | null = null,
    public token: string | null = null,
    public roles: RoleEnum[] | null = null,
    public expiresIn: string | null = null,
    public refreshToken: string | null = null
  ) {
  }
}
