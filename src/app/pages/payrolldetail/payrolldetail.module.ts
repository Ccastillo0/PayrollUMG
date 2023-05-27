import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollDetailRoutingModule } from './payrolldetail-routing.module';
import { PayrollDetailListComponent } from './payrolldetail-list/payrolldetail-list.component';
import { SharedModule } from '@shared/shared.module';
import { PayrolldetailManageComponent } from './payrolldetail-manage/payrolldetail-manage.component';


@NgModule({
  declarations: [
    PayrollDetailListComponent,
    PayrolldetailManageComponent
  ],
  imports: [
    CommonModule,
    PayrollDetailRoutingModule,
    SharedModule
  ]
})
export class PayrollDetailModule { 
  
}
