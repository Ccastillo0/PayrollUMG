import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PayrollApi } from 'src/app/response/payroll/payroll.response';
import { PayrollService } from 'src/app/services/payroll.service';
import { PayrollManageComponent } from '../payroll-manage/payroll-manage.component';
import { componentSettings } from './payroll-list-config';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class PayrollListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _PayrollService: PayrollService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Payroll')
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
    this._dialog.open(PayrollManageComponent, {
      disableClose: true,
      width: '600px'
    }).afterClosed().subscribe( 
      (res) => {
        if(res){
          this.formatGetInputs()
        }
      }
    )

  }

  rowClick(e: any) {
    console.log("RowClick",e)
    let action = e.action
    let payroll = e.row
    
    switch (action) {
      case "edit":
        this.PayrollEdit(payroll)
        console.log('EDIT: ', payroll)
        break
      case "remove":
        this.PayrollRemove(payroll)
        console.log('REMOVE: ', payroll)

        break
    }
    return false
  }

  PayrollEdit(row: PayrollApi) {
    console.log('ID: ', row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(PayrollManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
    })
    dialogRef
    .afterClosed().subscribe((res) => {
      if(res){
        this.formatGetInputs()
      }
    });
  }

  PayrollRemove(payroll: any) {
    Swal.fire({
      title: '¿Realmente deseas eliminar el usuario - ' + payroll.payrollId + ' ?',
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
        this._PayrollService.PayrollRemove(payroll.payrollId).subscribe(() => this.formatGetInputs(),
          (error) => {
            // Manejar el error de solicitud aquí
          });
      }
    })
  }}