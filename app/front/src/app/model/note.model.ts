import { DocumentModel } from './document.model';
import { PermissionModel } from './permission.model';
import { UserModel } from './user.model';

export class NoteModel extends DocumentModel {
  constructor(
    id: string | null,
    name: string | null,
    description: string | null,
    isDirectory: boolean | null,
    parent: DocumentModel | string | null,
    author: UserModel | string | null,
    permission: PermissionModel | null,
    public content: string | null = null,
    partner: UserModel[] | string[] | null,
    createdAt: Date | null,
    lastModifiedAt: Date | null,
    version: number | 0
  ) {
    super(id, name, description, isDirectory, parent, author, permission, partner, createdAt, lastModifiedAt, version);
  }

  public static override create(): DocumentModel {
    return new NoteModel(
      null,
      "New Note",
      null,
      false,
      null,
      null,
      null,
      null,
      null,
      new Date(),
      new Date(),
      0
    );
  }
}

