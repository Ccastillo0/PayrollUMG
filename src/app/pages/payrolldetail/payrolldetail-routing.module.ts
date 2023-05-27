import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollDetailListComponent } from './payrolldetail-list/payrolldetail-list.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollDetailListComponent,
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
export class PayrollDetailRoutingModule { }
