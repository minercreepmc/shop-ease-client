import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { ApiApplication } from '@constant';
import { LogInDto } from '@dto';
import { UserModel } from '@model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  private profile = new ReplaySubject<UserModel>();
  private isLoggedIn = new ReplaySubject<boolean>();

  get profile$() {
    return this.profile;
  }

  get isLoggedIn$() {
    return this.isLoggedIn;
  }

  setProfile$(profile: UserModel) {
    this.profile.next(profile);
  }

  setIsLoggedIn$(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  logIn$(dto: LogInDto) {
    return this.http
      .post(
        ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.LOGIN,
        dto,
      )
      .pipe(tap(() => this.setIsLoggedIn$(true)));
  }

  logOut$() {
    return this.http
      .post(
        ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.LOGOUT,
        {},
      )
      .pipe(
        tap(() => {
          this.setIsLoggedIn$(false);
        }),
      );
  }

  getProfile$(): Observable<UserModel> {
    return this.http.get<UserModel>(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.GET_PROFILE,
      {},
    );
  }

  checkLoggedIn$(): Observable<boolean> {
    return this.http.post<boolean>(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.IS_LOGGED_IN,
      {},
    );
  }
}
