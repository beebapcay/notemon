import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentModel } from '../model/document.model';
import { MessageResponseModel } from '../model/message-response.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  static readonly DOCUMENT_URL = environment.backend.baseUrl + '/documents/';

  change: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor(private http: HttpClient) {
  }

  updateNameDocument(userId: string, documentId: string, document: DocumentModel): Observable<MessageResponseModel> {
    const updateNameDocumentUrl = DocumentService.DOCUMENT_URL + documentId + '/users/' + userId + '/name';
    return this.http.patch<MessageResponseModel>(updateNameDocumentUrl, {...document});
  }
}
