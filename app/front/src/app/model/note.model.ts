import {DocumentModel} from './document.model';
import {UserDocumentModel} from './user-document.model';
import {UserModel} from './user.model';
import {DocumentSummaryModel} from './document-summary.model';

export class NoteModel extends DocumentModel {
  constructor(
    id: string | null = null,
    name: string | null,
    description: string | null,
    isDirectory: boolean | null,
    parent: DocumentModel | string | null = null,
    author: UserModel | null,
    shareCode: string | null = null,
    permission: UserDocumentModel | null,
    public content: string | null = '',
    partner: UserModel[] | null,
    createdAt: Date | null = null,
    lastModifiedAt: Date | null = null,
    summary: DocumentSummaryModel | null = null,
    version: number | 0 = 0,
  ) {
    super(id, name, description, isDirectory, parent, author, shareCode, permission, partner, createdAt, lastModifiedAt, summary, version);
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
      '',
      null,
      new Date(),
      new Date(),
      DocumentSummaryModel.create(),
      0
    );
  }
}

