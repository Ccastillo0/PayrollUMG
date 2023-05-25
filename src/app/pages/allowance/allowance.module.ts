import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllowanceRoutingModule } from './allowance-routing.module';
import { AllowanceListComponent } from './allowance-list/allowance-list.component';
import { SharedModule } from '@shared/shared.module';
import { AllowanceManageComponent } from './allowance-manage/allowance-manage.component';


@NgModule({
  declarations: [
    AllowanceListComponent,
    AllowanceManageComponent
  ],
  imports: [
    CommonModule,
    AllowanceRoutingModule,
    SharedModule
  ]
})
export class AllowanceModule { 
  
}
