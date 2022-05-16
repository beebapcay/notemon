import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentModel } from '../model/document.model';
import { MessageResponseModel } from '../model/message-response.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly USER_URL = environment.backend.baseUrl + '/users/';

  user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  getUserById(id: string): Observable<UserModel> {
    const getUserByIdUrl = UserService.USER_URL + id;
    return this.http.get<UserModel>(getUserByIdUrl);
  }

  createNewDocument(userId: string, document: DocumentModel): Observable<MessageResponseModel> {
    const createNewDocumentUrl = UserService.USER_URL + userId + '/document';
    return this.http.post<MessageResponseModel>(createNewDocumentUrl, {...document});
  }

  getAllDocuments(userId: string, parentId: string, isDirectory: boolean | null): Observable<DocumentModel[]> {
    const getAllDocumentsUrl = UserService.USER_URL + userId + '/documents';
    const queryParams = {
      parentId: parentId ?? '',
      isDirectory: isDirectory ?? ''
    }
    return this.http.get<DocumentModel[]>(getAllDocumentsUrl, {params: queryParams});
  }
}

