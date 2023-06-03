import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PositionService } from 'src/app/services/position.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-position-manage',
  templateUrl: './position-manage.component.html',
  styleUrls: ['./position-manage.component.scss']
})
export class PositionManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      positionId: [0, [Validators.required]],
      positionName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      
    })

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _positionService: PositionService,
    private _dialogRef: MatDialogRef<PositionManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    if (this.data != null) {
      this.PositionById(this.data.data.positionId)
    }
  }

  PositionById(positionId: number): void {
    this._positionService.PositionById(positionId).subscribe(
      (resp) => {
        this.form.reset({
          positionId: resp.positionId,
          positionName: resp.positionName,
          
        })
      }
    )
  }

  PositionSave(): void {
    console.log(this.data)
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const positionId = this.form.get('positionId').value
    console.log(positionId)

    if (positionId > 0) {
      this.PositionEdit(positionId)
    } else {
      this.PositionRegister()
    }
  }


  PositionRegister(): void {
    this._positionService.PositionRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  PositionEdit(positionId: number): void {
    this._positionService.PositionEdit(positionId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)

      } else {
        this._alert.success('Atencion', resp.message);
      }
    })

  }
}




