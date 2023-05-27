import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PayrollService } from 'src/app/services/payroll.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-payroll-manage',
  templateUrl: './payroll-manage.component.html',
  styleUrls: ['./payroll-manage.component.scss']
})
export class PayrollManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      payrollId: [0, [Validators.required]],
      employeeId: ['', [Validators.required]],
      periodStart: ['', [Validators.required]],
      periodEnd: ['', [Validators.required]],
      totalEarned: ['', [Validators.required]],
      totalDeducted: ['', [Validators.required]],
      totalToPay: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _payrollService: PayrollService,
    private _dialogRef: MatDialogRef<PayrollManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data != null) {
      this.PayrollById(this.data.data.payrollId)
    }
  }

  PayrollById(payrollId: number): void {
    this._payrollService.PayrollById(payrollId).subscribe(
      (resp) => {
        this.form.reset({
          payrollId: resp.payrollId,
          employeeId: resp.employeeId,
          periodStart: resp.periodStart,
          periodEnd: resp.periodEnd,
          totalEarned: resp.totalEarned,
          totalDeducted: resp.totalDeducted,
          totalToPay: resp.totalToPay
        })
      }
    )
  }

  PayrollSave(): void {
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    // this.PayrollRegister()
    const payrollId = this.form.get('payrollId').value
    console.log(payrollId)

    if (payrollId > 0) {
      this.PayrollEdit(payrollId)
    } else {
      this.PayrollRegister()
    }
  }


  PayrollRegister(): void {
    this._payrollService.PayrollRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }
  PayrollEdit(payrollId: number): void {
      this._payrollService.PayrollEdit(payrollId, this.form.value).subscribe(resp => {
    if (resp.isSuccess) {
      this._alert.success('Successfull', resp.message);
      this._dialogRef.close(true);
    } else {
      this._alert.warn('Atention', resp.message);
    }
  });
  }

}



