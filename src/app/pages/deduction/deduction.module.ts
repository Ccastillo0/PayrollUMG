import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionRoutingModule } from './deduction-routing.module';
import { DeductionListComponent } from './deduction-list/deduction-list.component';
import { SharedModule } from '@shared/shared.module';
import { DeductionManageComponent } from './deduction-manage/deduction-manage.component';


@NgModule({
  declarations: [
    DeductionListComponent,
    DeductionManageComponent
  ],
  imports: [
    CommonModule,
    DeductionRoutingModule,
    SharedModule
  ]
})
export class DeductionModule { 
  
}
