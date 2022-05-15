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
  static readonly AUTH_URL = environment.backend.baseUrl + '/users/';

  user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  getUserById(id: string): Observable<UserModel> {
    const getUserByIdUrl = UserService.AUTH_URL + id;
    return this.http.get<UserModel>(getUserByIdUrl);
  }

  createNewDocument(userId: string, document: DocumentModel): Observable<MessageResponseModel> {
    const createNewDocumentUrl = UserService.AUTH_URL + userId + '/document';
    console.log("commit new document: " + JSON.stringify(document));
    return this.http.post<MessageResponseModel>(createNewDocumentUrl, {...document});
  }
}
