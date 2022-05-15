import { BaseModel } from './base.model';

export class UserDocumentModel extends BaseModel {
  constructor(
    id: string | null = null,
    public isPinned: boolean | null = null,
    public isStarred: boolean | null = null,
    version: number | null = null,
  ) {
    super(id, version);
  }
}
