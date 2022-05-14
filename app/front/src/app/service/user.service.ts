import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly AUTH_URL = environment.backend.baseUrl + '/auth';

  constructor(private http: HttpClient) {
  }

  getUserById(id: string): Observable<UserModel> {
    const getUserByIdUrl = UserService.AUTH_URL + '/user/' + id;
    return this.http.get<UserModel>(getUserByIdUrl);
  }
}
