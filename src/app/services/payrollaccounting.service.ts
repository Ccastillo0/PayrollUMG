import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { PayrollAccountingRequest } from '../requests/payrollaccounting/payrollaccounting.request';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollAccountingService {

  constructor(
    private _http: HttpClient,
    private _alert: AlertService
  ) { }

  PayrollAccountingList(payrollaccounting: PayrollAccountingRequest): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    const requestUrl = env.api + endpoint.LIST_PAYRROLLACCOUNTING;
    console.log(requestUrl);
    
    return this._http.post<Blob>(requestUrl, payrollaccounting, { headers: headers, responseType: 'blob' as 'json' });
  }

}
