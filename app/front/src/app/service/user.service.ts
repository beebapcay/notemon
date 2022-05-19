import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import {environment} from 'src/environments/environment';
import {DocumentModel} from '../model/document.model';
import {UserModel} from '../model/user.model';
import { AuthService } from './auth.service';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly USER_URL = environment.backend.baseUrl + '/users/';

  user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient,
              private persistenceService: PersistenceService,
              private authService: AuthService) {
  }

  fetchUser() {
    const userId = this.persistenceService.get('id');
    const jwtToken = this.persistenceService.get('token');

    if (!userId && !jwtToken) {
      this.authService.isLoggedIn.next(false);
    }

    this.getUserById(userId)
      .pipe(take(1))
      .subscribe({
          next: user => {
            this.authService.isLoggedIn.next(true);
            this.user.next(user);
          },
          error: () => {
            this.authService.isLoggedIn.next(false);
            this.user.next(null);
          }
        }
      )
  }

  getUserById(id: string): Observable<UserModel> {
    const getUserByIdUrl = UserService.USER_URL + id;
    return this.http.get<UserModel>(getUserByIdUrl);
  }

  createNewDocument(userId: string, document: DocumentModel): Observable<DocumentModel> {
    const createNewDocumentUrl = UserService.USER_URL + userId + '/document';
    return this.http.post<DocumentModel>(createNewDocumentUrl, {...document});
  }

  getDocumentById(userId: string, documentId: string): Observable<DocumentModel> {
    const getDocumentByIdUrl = UserService.USER_URL + userId + '/documents/' + documentId;
    return this.http.get<DocumentModel>(getDocumentByIdUrl);
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

