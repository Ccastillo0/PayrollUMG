import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { User, UserApi } from '../response/user/user.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListUserRequest } from '../requests/user/list-user.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserRequest } from '../requests/user/user.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertService
  ) { }

  GetAll(
    size,
    sort,
    order,
    page,
    getInputs
  ): Observable<UserApi> {

    const requestUrl = env.api + endpoint.LIST_USER
    console.log(requestUrl)
    const params: ListUserRequest = new ListUserRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<UserApi>(requestUrl, params).pipe(
      map((data: UserApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.userId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  UserRegister(user: UserRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.USER_REGISTER
    console.log(requestUrl)
    return this._http.post(requestUrl, user).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

  UserById(UserId: number): Observable<User> {
    console.log("UserId")
    console.log(UserId)
    const requestUrl = env.api+endpoint.USER_BY_ID+UserId
    console.log('Api User By Id ' + requestUrl)
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data
      })
    )
  }

  UserEdit(UserId: number, user: UserRequest): Observable<ApiResponse> {
    console.log(UserId, user);
    const requestUrl = env.api+endpoint.USER_EDIT+UserId
    console.log('Api UserEdit ' + requestUrl)
    return this._http.put(requestUrl, user).pipe(map((resp: ApiResponse) => {
      return resp
    })
    )
  }

  UserRemove(UserId: number): Observable<void> {
    const requestUrl = env.api + endpoint.USER_REMOVE + UserId;
    return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('User Delete Successfull', resp.message);
        }
      })
    );
  }
  

}

