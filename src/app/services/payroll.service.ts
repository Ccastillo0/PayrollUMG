import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Payroll, PayrollApi } from '../response/payroll/payroll.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListPayrollRequest } from '../requests/payroll/list-payroll.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PayrollRequest } from '../requests/payroll/payroll.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

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
  ): Observable<PayrollApi> {
    const requestUrl = env.api + endpoint.LIST_PAYROLL;
    console.log(requestUrl);
    const params: ListPayrollRequest = new ListPayrollRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    );
    return this._http.post<PayrollApi>(requestUrl, params).pipe(
      map((data: PayrollApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.payrollId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light';
              break;
          }
        });
        return data;
      })
    );
  }

  PayrollRegister(payroll: PayrollRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.PAYROLL_REGISTER;
    console.log(requestUrl);
    return this._http.post(requestUrl, payroll).pipe(
      map((resp: ApiResponse) => {
        return resp;
      })
    );
  }

  PayrollById(PayrollId: number): Observable<Payroll> {
    console.log("PayrollId");
    console.log(PayrollId);
    const requestUrl = env.api + endpoint.PAYROLL_BY_ID + PayrollId;
    console.log('Api Payroll By Id ' + requestUrl);
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data;
      })
    );
  }

  PayrollEdit(PayrollId: number, payroll: PayrollRequest): Observable<ApiResponse> {
    console.log(PayrollId, payroll);
    const requestUrl = env.api + endpoint.PAYROLL_EDIT + PayrollId;
    console.log('Api PayrollEdit ' + requestUrl);
    return this._http.put(requestUrl, payroll).pipe(map((resp: ApiResponse) => {
      return resp;
    }));
  }

  PayrollRemove(PayrollId: number): Observable<void> {
    const requestUrl = env.api + endpoint.PAYROLL_REMOVE + PayrollId;
    return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('User Delete Successfull', resp.message);
        }
      })
    );
  }
}