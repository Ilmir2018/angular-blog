import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponce, User } from '../interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {


  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(responce: FbAuthResponce | null) {
    if (responce) {
      const expDate = new Date(new Date().getTime() + +responce.expiresIn * 1000);
      localStorage.setItem('fb-token', responce.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break;
    }
    // console.log(this.error$);

    return throwError(error)

  }


}
