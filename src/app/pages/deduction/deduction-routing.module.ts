import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionListComponent } from './deduction-list/deduction-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeductionListComponent,
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
export class DeductionRoutingModule { }
