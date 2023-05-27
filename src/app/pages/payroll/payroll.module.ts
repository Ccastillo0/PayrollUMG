import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { SharedModule } from '@shared/shared.module';
import { PayrollManageComponent } from './payroll-manage/payroll-manage.component';


@NgModule({
  declarations: [
    PayrollListComponent,
    PayrollManageComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule
  ]
})
export class PayrollModule { 
  
}
