import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from '@shared/shared.module';
import { DepartmentManageComponent } from './department-manage/department-manage.component';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentManageComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { 
  
}
