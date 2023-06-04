import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollAccountingListComponent } from './payrollaccounting-list/payrollaccounting-list.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollAccountingListComponent,
    data: {
      scrolDisabled: true,
      toolbarShadownEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollAccountingRoutingModule { }

