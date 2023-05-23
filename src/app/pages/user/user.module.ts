import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '@shared/shared.module';
import { UserManageComponent } from './user-manage/user-manage.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserManageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { 
  
}
