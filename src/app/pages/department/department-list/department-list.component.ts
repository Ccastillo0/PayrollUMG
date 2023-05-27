import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { DepartmentApi } from 'src/app/response/department/department.response';
import { DepartmentService } from 'src/app/services/department.service';
import { DepartmentManageComponent } from '../department-manage/department-manage.component';
import { componentSettings } from './department-list-config';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class DepartmentListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _DepartmentService: DepartmentService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Department')
  }

  ngOnInit(): void {
    console.log("DATA: ", componentSettings)
    this.component = componentSettings
  }


  setData(data: any = null) {
    this.component.filters.stateFilter = data.value
    this.component.menuOpen = false
    this.formatGetInputs()
  }
  search(data: any) {
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
    this._dialog.open(DepartmentManageComponent, {
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
    let department = e.row

    switch (action) {
      case "edit":
        this.DepartmentEdit(department)
        console.log('EDIT: ', department)
        break
      case "remove":
        this.DepartmentRemove(department)
        console.log('REMOVE: ', department)

        break
    }
    return false
  }

  DepartmentEdit(row: DepartmentApi) {
    console.log('ID: ', row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(DepartmentManageComponent, {
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

  DepartmentRemove(department: any) {
    Swal.fire({
      title: '¿Realmente deseas eliminar el usuario - ' + department.departmentName + ' ?',
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
        this._DepartmentService.DepartmentRemove(department.departmentId).subscribe(() => this.formatGetInputs(),
          (error) => {
            // Manejar el error de solicitud aquí
          });
      }
    })
  }

}
