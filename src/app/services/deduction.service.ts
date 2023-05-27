import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Deduction, DeductionApi } from '../response/deduction/deduction.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListDeductionRequest } from '../requests/deduction/list-deduction.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DeductionRequest } from '../requests/deduction/deduction.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

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
  ): Observable<DeductionApi> {

    const requestUrl = env.api + endpoint.LIST_DEDUCTION
    console.log(requestUrl)
    const params: ListDeductionRequest = new ListDeductionRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<DeductionApi>(requestUrl, params).pipe(
      map((data: DeductionApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.deductionId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  DeductionRegister(deduction: DeductionRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.DEDUCTION_REGISTER
    console.log(requestUrl)
    return this._http.post(requestUrl, deduction).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

  DeductionById(DeductionId: number): Observable<Deduction> {
    console.log("DeductionId")
    console.log(DeductionId)
    const requestUrl = env.api+endpoint.DEDUCTION_BY_ID+DeductionId
    console.log('Api Deduction By Id ' + requestUrl)
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data
      })
    )
  }

  DeductionEdit(DeductionId: number, deduction: DeductionRequest): Observable<ApiResponse> {
    console.log(DeductionId, deduction);
    const requestUrl = env.api+endpoint.DEDUCTION_EDIT+DeductionId
    console.log('Api DeductionEdit ' + requestUrl)
    return this._http.put(requestUrl, deduction).pipe(map((resp: ApiResponse) => {
      return resp
    })
    )
  }

  DeductionRemove(DeductionId: number): Observable<void> {
    const requestUrl = env.api + endpoint.DEDUCTION_REMOVE + DeductionId
    return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('User Delete Successfull', resp.message);
        }
      })
    );
  }

}

