import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import {
  LogInRequestDto,
  RegisterMemberHttpRequest,
  UpdateProfileHttpRequest,
  UpdateProfileHttpResponse,
  UserModel,
} from './auth.service.dto';
import { catchError, Observable, throwError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  registerMemberUrl = v1ApiEndpoints.registerMember;
  private logInUrl = v1ApiEndpoints.logIn;
  private getProfileUrl = v1ApiEndpoints.getProfile;
  private updateProfileUrl = v1ApiEndpoints.updateProfile;
  private logOutUrl = v1ApiEndpoints.logOut;

  register$(dto: RegisterMemberHttpRequest) {
    return this.http
      .post(this.registerMemberUrl, dto)
      .pipe(catchError(this.handleError));
  }

  logIn$(dto: LogInRequestDto) {
    return this.http
      .post(this.logInUrl, dto)
      .pipe(catchError(this.handleError));
  }

  logOut$() {
    return this.http
      .post(this.logOutUrl, {})
      .pipe(catchError(this.handleError));
  }

  getProfile$(): Observable<UserModel> {
    return this.http
      .get<UserModel>(this.getProfileUrl, {})
      .pipe(catchError(this.handleError));
  }

  updateProfile$(dto: UpdateProfileHttpRequest) {
    const url = this.updateProfileUrl;
    return this.http
      .put<UpdateProfileHttpResponse>(url, dto)
      .pipe(catchError(this.handleError));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.getProfile$().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
