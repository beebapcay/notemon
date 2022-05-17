import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {DocumentModel} from '../model/document.model';
import {MessageResponseModel} from '../model/message-response.model';
import {UserDocumentModel} from '../model/user-document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  static readonly DOCUMENT_URL = environment.backend.baseUrl + '/documents/';

  change: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  source: BehaviorSubject<DocumentModel[]> = new BehaviorSubject<DocumentModel[]>([]);

  constructor(private http: HttpClient) {
  }

  getDocumentByShareCode(shareCode: string): Observable<DocumentModel> {
    return this.http.get<DocumentModel>(DocumentService.DOCUMENT_URL + 'shareCode/' + shareCode);
  }

  addPartnerToDocument(documentId: string, relationship: UserDocumentModel): Observable<UserDocumentModel> {
    return this.http.post<UserDocumentModel>(DocumentService.DOCUMENT_URL + documentId + '/partner/', {...relationship});
  }

  updateNameDocument(userId: string, documentId: string, document: DocumentModel): Observable<DocumentModel> {
    const updateNameDocumentUrl = DocumentService.DOCUMENT_URL + documentId + '/users/' + userId + '/name';
    return this.http.patch<DocumentModel>(updateNameDocumentUrl, {...document});
  }

  updateStarredDocument(userId: string, documentId: string, relationship: UserDocumentModel): Observable<DocumentModel> {
    const updateStarredDocumentUrl = DocumentService.DOCUMENT_URL + documentId + '/users/' + userId + '/starred';
    return this.http.patch<DocumentModel>(updateStarredDocumentUrl, {...relationship});
  }

  deleteDocument(userId: string, documentId: string): Observable<MessageResponseModel> {
    const deleteDocumentUrl = DocumentService.DOCUMENT_URL + documentId + '/users/' + userId;
    return this.http.delete<MessageResponseModel>(deleteDocumentUrl);
  }
}
