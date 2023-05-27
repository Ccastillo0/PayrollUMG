import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Department, DepartmentApi } from '../response/department/department.response';
import { environment as env } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListDepartmentRequest } from '../requests/departament/list-department.request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DepartmentRequest } from '../requests/departament/department.request';
import { ApiResponse } from '../commons/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

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
  ): Observable<DepartmentApi> {

    const requestUrl = env.api + endpoint.LIST_DEPARTMENT
    console.log(requestUrl)
    const params: ListDepartmentRequest = new ListDepartmentRequest(
      page + 1,
      order,
      sort,
      size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
    )
    return this._http.post<DepartmentApi>(requestUrl, params).pipe(
      map((data: DepartmentApi) => {
        data.data.items.forEach(function (e: any) {
          switch (e.departmentId) {
            default:
              e.badgeColor = 'text-gray bg-gray-light'
              break
          }
        })
        return data
      })
    )
  }

  DepartmentRegister(department: DepartmentRequest): Observable<ApiResponse> {
    const requestUrl = env.api + endpoint.DEPARTMENT_REGISTER
    console.log(requestUrl)
    return this._http.post(requestUrl, department).pipe(
      map((resp: ApiResponse) => {
        return resp
      })
    )
  }

  DepartmentById(DepartmentId: number): Observable<Department> {
    console.log("DepartmentId")
    console.log(DepartmentId)
    const requestUrl = env.api+endpoint.DEPARTMENT_BY_ID+DepartmentId
    console.log('Api Department By Id ' + requestUrl)
    return this._http.get(requestUrl).pipe(
      map((resp: ApiResponse) => {
        return resp.data
      })
    )
  }

  DepartmentEdit(DepartmentId: number, department: DepartmentRequest): Observable<ApiResponse> {
    console.log(DepartmentId, department);
    const requestUrl = env.api+endpoint.DEPARTMENT_EDIT+DepartmentId
    console.log('Api DepartmentEdit ' + requestUrl)
    return this._http.put(requestUrl, department).pipe(map((resp: ApiResponse) => {
      return resp
    })
    )
  }

  DepartmentRemove(DepartmentId: number): Observable<void> {
    const requestUrl = env.api + endpoint.DEPARTMENT_REMOVE + DepartmentId;
    return this._http.delete(requestUrl).pipe(
      map((resp: ApiResponse) => {
        if (resp.isSuccess) {
          this._alert.success('Department Delete Successfull', resp.message);
        }
      })
    );
  }

}
