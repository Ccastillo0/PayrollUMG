import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollListComponent } from './payroll-list/payroll-list.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollListComponent,
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
export class PayrollRoutingModule { }
