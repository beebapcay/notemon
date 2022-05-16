import { PermissionEnum } from '../enum/permission.enum';
import { BaseModel } from './base.model';

export class PermissionModel extends BaseModel {
  constructor(
    id: string | null = null,
    public code: PermissionEnum | null = null,
    public description: string | null = null,
    version: number | null = null,
  ) {
    super(id, version);
  }

}
