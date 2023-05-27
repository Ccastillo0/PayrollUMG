import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { DeductionService } from 'src/app/services/deduction.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-deduction-manage',
  templateUrl: './deduction-manage.component.html',
  styleUrls: ['./deduction-manage.component.scss']
})
export class DeductionManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      deductionId: [0, [Validators.required]],
      description: ['', [Validators.required]],
      percentage: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _deductionService: DeductionService,
    private _dialogRef: MatDialogRef<DeductionManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data != null) {
      this.DeductionById(this.data.data.deductionId)
    }
  }

  DeductionById(deductionId: number): void {
    this._deductionService.DeductionById(deductionId).subscribe(
      (resp) => {
        this.form.reset({
          deductionId: resp.deductionId,
          description: resp.description,
          percentage: resp.percentage,
        })
      }
    )
  }

  DeductionSave(): void {
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const deductionId = this.form.get('deductionId').value
    console.log(deductionId)
    
    if (deductionId > 0) {
      this.DeductionEdit(deductionId)
    } else {
      this.DeductionRegister()
    }
  }


  DeductionRegister(): void {
    this._deductionService.DeductionRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  DeductionEdit(deductionId: number): void {
    this._deductionService.DeductionEdit(deductionId, this.form.value).subscribe(resp => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atention', resp.message);
      }
    });
  }

  DeductionDelete(deductionId: number): void { 
    
  }

  DeductionID(deductionId: number): void { 

  }


}



