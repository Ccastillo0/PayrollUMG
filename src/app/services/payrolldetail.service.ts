import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { PayrollDetail, PayrollDetailApi } from '../response/payrolldetail/payrolldetail.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPayrollDetailRequest } from '../requests/payrolldetail/list-payrolldetail.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PayrollDetailRequest } from '../requests/payrolldetail/payrolldetail.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PayrollDetailService {

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
  ): Observable<PayrollDetailApi> {

    const requestUrl = env.api + endpoint.LIST_PAYROLLDETAIL
    console.log(requestUrl)
    const params: ListPayrollDetailRequest = new ListPayrollDetailRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<PayrollDetailApi>(requestUrl, params).pipe(
      map((data: PayrollDetailApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.detailId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  PayrollDetailRegister(payrolldetail: PayrollDetailRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.PAYROLLDETAIL_REGISTER
    console.log(requestUrl)
    return this._http.post(requestUrl, payrolldetail).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

  PayrollDetailById(detailId: number): Observable<PayrollDetail> {
    console.log("detailId")
    console.log(detailId)
    const requestUrl = env.api+endpoint.PAYROLLDETAIL_BY_ID+detailId
    console.log('Api PayrollDetail By Id ' + requestUrl)
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data
      })
    )
  }

  PayrollDetailEdit(detailId: number, PayrollDetail: PayrollDetailRequest): Observable<ApiResponse> {
    console.log(detailId, PayrollDetail);
    const requestUrl = env.api+endpoint.PAYROLLDETAIL_EDIT+detailId
    console.log('Api PayrollDetailEdit ' + requestUrl)
    return this._http.put(requestUrl, PayrollDetail).pipe(map((resp: ApiResponse) => {
      return resp
    })
    )
  }



  PayrollDetailRemove(detailId: number): Observable<void> {
    const requestUrl = env.api + endpoint.PAYROLLDETAIL_REMOVE + detailId
     return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('Payroll Detail Delete Successfull', resp.message);
        }
      })
    );
    
  }

}