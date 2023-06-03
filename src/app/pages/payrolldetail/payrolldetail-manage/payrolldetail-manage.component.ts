import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PayrollDetailService } from 'src/app/services/payrolldetail.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-payrolldetail-manage',
  templateUrl: './payrolldetail-manage.component.html',
  styleUrls: ['./payrolldetail-manage.component.scss']
})
export class PayrolldetailManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      detailId: [0, [Validators.required]],
      payrollId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      conceptId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      conceptType: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],

    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _payrolldetailService: PayrollDetailService,
    private _dialogRef: MatDialogRef<PayrolldetailManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data != null) {
      this.PayrollDetailById(this.data.data.detailId)
    }
  }

  PayrollDetailById(detailId: number): void {
    this._payrolldetailService.PayrollDetailById(detailId).subscribe(
      (resp) => {
        this.form.reset({
            detailId: resp.detailId,
            payrollId: resp.payrollId,
            conceptId: resp.conceptId,
            conceptType: resp.conceptType,
            amount: resp.amount,
          


        })
      }
    )
  }

  PayrolldetailSave(): void {
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const detailId = this.form.get('detailId').value
    console.log(detailId)

    if (detailId > 0) {
      this.PayrolldetailEdit(detailId)
    } else {
      this.PayrollDetailRegister()
    }
  }


  PayrollDetailRegister(): void {
    this._payrolldetailService.PayrollDetailRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  PayrolldetailEdit(detailId: number): void {
    this._payrolldetailService.PayrollDetailEdit(detailId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)

      } else {
        this._alert.success('Atencion', resp.message);
      }
    })

  }
}
