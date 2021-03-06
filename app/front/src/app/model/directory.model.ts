import {DocumentModel} from './document.model';
import {UserDocumentModel} from './user-document.model';
import {UserModel} from './user.model';
import {DocumentSummaryModel} from './document-summary.model';

export class DirectoryModel extends DocumentModel {
  constructor(
    id: string | null = null,
    name: string | null = null,
    description: string | null = null,
    isDirectory: boolean | null = null,
    parent: DocumentModel | string | null = null,
    public children: DocumentModel[] | string[] | null = null,
    author: UserModel | null = null,
    shareCode: string | null = null,
    permission: UserDocumentModel | null = null,
    partner: UserModel[] | null = null,
    createdAt: Date | null = null,
    lastModifiedAt: Date | null = null,
    summary: DocumentSummaryModel | null = null,
    version: number | null = null,
  ) {
    super(id, name, description, isDirectory, parent, author, shareCode, permission, partner, createdAt, lastModifiedAt, summary, version);
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
      null,
      new Date(),
      new Date(),
      DocumentSummaryModel.create(),
      0);
  }
}
