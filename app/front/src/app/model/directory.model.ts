import { DocumentModel } from './document.model';
import { UserDocumentModel } from './user-document.model';
import { UserModel } from './user.model';

export class DirectoryModel extends DocumentModel {
  constructor(
    id: string | null = null,
    name: string | null = null,
    description: string | null = null,
    isDirectory: boolean | null = null,
    parent: DocumentModel | string | null = null,
    public children: DocumentModel[] | string[] | null = null,
    author: UserModel | string | null = null,
    permission: UserDocumentModel | null = null,
    partner: UserModel[] | string[] | null = null,
    createdAt: Date | null = null,
    lastModifiedAt: Date | null = null,
    version: number | null = null,
  ) {
    super(id, name, description, isDirectory, parent, author, permission, partner, createdAt, lastModifiedAt, version);
  }

  public static override create(): DocumentModel {
    return new DirectoryModel(
      null,
      "New Document",
      null,
      true,
      null,
      [],
      null,
      null,
      null,
      new Date(),
      new Date(),
      0);
  }
}
