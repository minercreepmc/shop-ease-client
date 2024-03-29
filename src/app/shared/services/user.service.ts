import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import {
  CreateMemberDto,
  CreateShipperDto,
  CreateStaffDto,
  UpdateUserDto,
} from '@dto';
import { UserModel } from '@model';
import { UserRO } from '@ro';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private users = new BehaviorSubject<any[]>([]);

  get users$() {
    return this.users;
  }

  createStaff$(dto: CreateStaffDto): Observable<UserModel> {
    return this.http
      .post<UserModel>(
        ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.CREATE_STAFF,
        dto,
      )
      .pipe(
        tap((user) => {
          this.users.next([...this.users.value, user]);
        }),
      );
  }

  createShipper$(dto: CreateShipperDto): Observable<UserModel> {
    return this.http
      .post<UserModel>(
        ApiApplication.USER.CONTROLLER +
          '/' +
          ApiApplication.USER.CREATE_SHIPPER,
        dto,
      )
      .pipe(
        tap((user) => {
          this.users.next([...this.users.value, user]);
        }),
      );
  }

  createMember$(dto: CreateMemberDto): Observable<UserModel> {
    return this.http.post<UserModel>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.CREATE_MEMBER,
      dto,
    );
  }

  updateProfile$(dto: UpdateUserDto): Observable<UserModel> {
    return this.http.post<UserModel>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.UPDATE_PROFILE,
      dto,
    );
  }

  updateUser$(id: string, dto: UpdateUserDto): Observable<UserModel> {
    return this.http.put<UserModel>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.UPDATE.replace(':id', id),
      dto,
    );
  }

  setUsers$(users: any[]) {
    this.users.next(users);
  }

  getUser$(id: string) {
    return this.http.get<UserRO>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.GET_ONE.replace(':id', id),
      {},
    );
  }

  getUsers$() {
    return this.http.get<UserModel[]>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.GET_ALL_USER,
      {},
    );
  }

  getAllStaffs$(): Observable<UserRO[]> {
    return this.http.post<UserRO[]>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.GET_ALL_STAFF,
      {},
    );
  }

  getAllShippers$(): Observable<UserRO[]> {
    return this.http.get<UserRO[]>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.GET_ALL_SHIPPER,
      {},
    );
  }
}
