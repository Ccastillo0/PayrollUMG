import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionRoutingModule } from './position-routing.module';
import { PositionListComponent } from './position-list/position-list.component';
import { SharedModule } from '@shared/shared.module';
import { PositionManageComponent } from './position-manage/position-manage.component';


@NgModule({
  declarations: [
    PositionListComponent,
    PositionManageComponent
  ],
  imports: [
    CommonModule,
    PositionRoutingModule,
    SharedModule
  ]
})
export class PositionModule { 
  
}
