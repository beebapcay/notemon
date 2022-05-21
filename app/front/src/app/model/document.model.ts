import {BaseModel} from './base.model';
import {UserDocumentModel} from './user-document.model';
import {UserModel} from './user.model';
import {DocumentSummaryModel} from './document-summary.model';

export class DocumentModel extends BaseModel {
  constructor(
    id: string | null = null,
    public name: string | null = null,
    public description: string | null = null,
    public isDirectory: boolean | null = null,
    public parent: DocumentModel | string | null = null,
    public author: UserModel | null = null,
    public shareCode: string | null = null,
    public relationship: UserDocumentModel | null = null,
    public partner: UserModel[] | null = null,
    public createdAt: Date | null = null,
    public lastModifiedAt: Date | null = null,
    public summary: DocumentSummaryModel | null = null,
    version: number | null = null,
  ) {
    super(id, version);
  }

  public static create(): DocumentModel {
    return new DocumentModel(
      null,
      'New Document',
      null,
      null,
      null,
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
