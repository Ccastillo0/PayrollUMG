import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '@shared/shared.module';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeManageComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { 
  
}
