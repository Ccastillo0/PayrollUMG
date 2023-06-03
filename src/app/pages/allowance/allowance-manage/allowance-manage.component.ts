import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { AllowanceService } from 'src/app/services/allowance.service';
import * as configs from '../../../../static-data/configs';



@Component({
  selector: 'vex-allowance-manage',
  templateUrl: './allowance-manage.component.html',
  styleUrls: ['./allowance-manage.component.scss']
})
export class AllowanceManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      allowanceId: [0, [Validators.required]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      amount: ['', [Validators.required]]
    })

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _allowanceService: AllowanceService,
    private _dialogRef: MatDialogRef<AllowanceManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    if (this.data != null) {
      this.AllowanceById(this.data.data.allowanceId)
    }
  }

  AllowanceById(allowanceId: number): void {
    this._allowanceService.AllowanceById(allowanceId).subscribe(
      (resp) => {
        this.form.reset({
          allowanceId: resp.allowanceId,
          description: resp.description,
          amount: resp.amount
        })
      }
    )
  }

  AllowanceSave(): void {
    console.log(this.data)
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const allowanceId = this.form.get('allowanceId').value
    console.log(allowanceId)

    if (allowanceId > 0) {
      this.AllowanceEdit(allowanceId)
    } else {
      this.AllowanceRegister()
    }
  }


  AllowanceRegister(): void {
    this._allowanceService.AllowanceRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  AllowanceEdit(allowanceId: number): void {
    this._allowanceService.AllowanceEdit(allowanceId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)

      } else {
        this._alert.success('Atencion', resp.message);
      }
    })

  }

  

}
