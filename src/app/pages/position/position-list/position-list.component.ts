import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PositionApi } from 'src/app/response/position/position.response';
import { PositionService } from 'src/app/services/position.service';
import { PositionManageComponent } from '../position-manage/position-manage.component';
import { componentSettings } from './position-list-config';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class PositionListComponent implements OnInit {
  component

  constructor(
    customTitle: CustomTitleService,
    public _PositionService: PositionService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Position')
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
    this._dialog.open(PositionManageComponent, {
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
    let position = e.row

    switch (action) {
      case "edit":
        this.PositionEdit(position)
        console.log('EDIT: ', position)
        break
      case "remove":
        this.PositionRemove(position)
        console.log('REMOVE: ', position)

        break
    }
    return false
  }

  PositionEdit(row: PositionApi) {
    console.log('ID: ', row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = row

    let dialogRef = this._dialog.open(PositionManageComponent, {
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

  PositionRemove(position: any) {
    Swal.fire({
      title: '¿Realmente deseas eliminar el departamento - ' + position.positionName + ' ?',
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
        this._PositionService.PositionRemove(position.positionId).subscribe(() => this.formatGetInputs(),
          (error) => {
            // Manejar el error de solicitud aquí
          });
      }
    })
  }

}

