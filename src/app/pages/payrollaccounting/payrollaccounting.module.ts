import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollAccountingRoutingModule } from './payrollaccounting-routing.module';
import { PayrollAccountingListComponent } from './payrollaccounting-list/payrollaccounting-list.component';
import { SharedModule } from '@shared/shared.module';
import { PayrollAccountingManageComponent } from './payrollaccounting-manage/payrollaccounting-manage.component';


@NgModule({
  declarations: [
    PayrollAccountingListComponent,
    PayrollAccountingManageComponent
  ],
  imports: [
    CommonModule,
    PayrollAccountingRoutingModule,
    SharedModule
  ]
})
export class PayrollAccountingModule { 
  
}
