import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Position, PositionApi } from '../response/position/position.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPositionRequest } from '../requests/position/list-position.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PositionRequest } from '../requests/position/position.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

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
  ): Observable<PositionApi> {

    const requestUrl = env.api + endpoint.LIST_POSITION
    console.log(requestUrl)
    const params: ListPositionRequest = new ListPositionRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<PositionApi>(requestUrl, params).pipe(
      map((data: PositionApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.positionId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  PositionRegister(position: PositionRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.POSITION_REGISTER
    console.log(requestUrl)
    return this._http.post(requestUrl, position).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

  PositionById(PositionId: number): Observable<Position> {
    console.log("PositionId")
    console.log(PositionId)
    const requestUrl = env.api+endpoint.POSITION_BY_ID+PositionId
    console.log('Api Position By Id ' + requestUrl)
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data
      })
    )
  }

  PositionEdit(PositionId: number, position: PositionRequest): Observable<ApiResponse> {
    console.log(PositionId, position);
    const requestUrl = env.api+endpoint.POSITION_EDIT+PositionId
    console.log('Api PositionEdit ' + requestUrl)
    return this._http.put(requestUrl, position).pipe(map((resp: ApiResponse) => {
      return resp
    })
    )
  }

  PositionRemove(PositionId: number): Observable<void> {
    const requestUrl = env.api + endpoint.POSITION_REMOVE + PositionId;
    return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('Position Delete Successfull', resp.message);
        }
      })
    );
  }

}

