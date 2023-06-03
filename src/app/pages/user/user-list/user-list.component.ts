import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { UserApi } from 'src/app/response/user/user.response';
import { UserService } from 'src/app/services/user.service';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { componentSettings } from './user-list-config';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class UserListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _UserService: UserService,
    public _dialog: MatDialog
  ) {
    customTitle.set('User')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }


  setData(data: any = null) {
    this.component.filters.stateFilter = data.value
    this.component.menuOpen = false
    this.formatGetInputs()
  }
  search(data: any) {
    debugger
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchString
    this.formatGetInputs()
  }

  formatGetInputs() {
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null
    }
    if (this.component.filters.numFilter != "") {
      inputs.numFilter = this.component.filters.numFilter
      inputs.textFilter = this.component.filters.textFilter
    }
    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter
    }
    this.component.getInputs = inputs

  }
  openDialogRegister() {
    this._dialog.open(UserManageComponent, {
      disableClose: true,
      width: '600px'
    }).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.formatGetInputs()
        }
      }
    )

  }

  rowClick(e: any) {
    console.log("RowClick", e)
    let action = e.action
    let user = e.row

    switch (action) {
      case "edit":
        this.UserEdit(user)
        console.log('EDIT: ', user)
        break
      case "remove":
        this.UserRemove(user)
        console.log('REMOVE: ', user)

        break
    }
    return false
  }

  UserEdit(row: UserApi) {
    console.log('ID: ', row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(UserManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
    })
    dialogRef
      .afterClosed().subscribe((res) => {
        if (res) {
          this.formatGetInputs()
        }
      });
  }

  UserRemove(user: any) {
    Swal.fire({
      title: '¿Realmente deseas eliminar el usuario - ' + user.username + ' ?',
      text: "Se borrara de forma permanente",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210, 155, 253)',
      cancelButtonColor: 'rgb(79, 109, 253',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      width: 430
    }).then((result) => {
      if (result.isConfirmed) {
        this._UserService.UserRemove(user.userId).subscribe(() => this.formatGetInputs(),
          (error) => {
            // Manejar el error de solicitud aquí
          });
      }
    })
  }

}
