import {BaseModel} from './base.model';
import {PermissionModel} from './permission.model';

export class UserDocumentModel extends BaseModel {
  constructor(
    id: string | null = null,
    public permission: PermissionModel | null = null,
    public isPinned: boolean | null = null,
    public isStarred: boolean | null = null,
    version: number | null = null,
  ) {
    super(id, version);
  }

  static create() {
    return new UserDocumentModel(
      null,
      null,
      false,
      false,
      0,
    );
  }
}
