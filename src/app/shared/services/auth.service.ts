import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import {
  LogInRequestDto,
  RegisterMemberHttpRequest,
  UserModel,
} from './auth.service.dto';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  registerMemberUrl = v1ApiEndpoints.registerMember;
  logInUrl = v1ApiEndpoints.logIn;
  getProfileUrl = v1ApiEndpoints.getProfile;
  logOutUrl = v1ApiEndpoints.logOut;

  register$(dto: RegisterMemberHttpRequest) {
    return this.http.post(this.registerMemberUrl, dto).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  logIn$(dto: LogInRequestDto) {
    return this.http.post(this.logInUrl, dto).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  logOut() {
    return this.http.post(this.logOutUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  getProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.getProfileUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }
}
