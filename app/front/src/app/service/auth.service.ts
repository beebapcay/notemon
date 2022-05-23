import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment'
import {AuthModel} from '../model/auth.model';
import {MessageResponseModel} from '../model/message-response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  static readonly AUTH_URL = environment.backend.baseUrl + '/auth';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  loginLocal(email: string, password: string): Observable<AuthModel> {
    const loginLocalUrl = AuthService.AUTH_URL + '/login/local';
    return this.http.post<AuthModel>(loginLocalUrl, {email, password});
  }

  loginGoogle(email: string, googleToken: string): Observable<AuthModel> {
    const loginGoogleUrl = AuthService.AUTH_URL + '/login/google';
    return this.http.post<AuthModel>(loginGoogleUrl, {email, googleToken});
  }

  signup(name: string, email: string, password: string): Observable<MessageResponseModel> {
    const signupLocalUrl = AuthService.AUTH_URL + '/signup';
    return this.http.post<MessageResponseModel>(signupLocalUrl, {name, email, password});
  }

  refreshToken(refreshToken: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(AuthService.AUTH_URL + '/refreshToken', {refreshToken});
  }
}

