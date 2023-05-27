import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';


const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
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
export class DepartmentRoutingModule { }