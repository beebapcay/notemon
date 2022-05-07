import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { AuthModel } from '../model/auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  static readonly AUTH_URL = environment.backend.baseUrl + '/auth';

  constructor(private http: HttpClient) {
  }

  loginLocal(email: string, password: string): Observable<AuthModel> {
    const loginLocalUrl = AuthService.AUTH_URL + '/login/local';
    return this.http.post<AuthModel>(loginLocalUrl, {email, password});
  }

  loginGoogle(googleToken: string): Observable<AuthModel> {
    const loginGoogleUrl = AuthService.AUTH_URL + '/login/google';
    return this.http.post<AuthModel>(loginGoogleUrl, {googleToken});
  }

  signupLocal(name: string, email: string, password: string): Observable<AuthModel> {
    const signupLocalUrl = AuthService.AUTH_URL + '/signup/local';
    return this.http.post<AuthModel>(signupLocalUrl, {name, email, password});
  }
}

