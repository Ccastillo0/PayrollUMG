import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { PayrollAccountingService } from 'src/app/services/payrollaccounting.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-payrollaccounting-manage',
  templateUrl: './payrollaccounting-manage.component.html',
  styleUrls: ['./payrollaccounting-manage.component.scss']
})
export class PayrollAccountingManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      payrollaccountingId: [0, [Validators.required]],
      payrollaccountingName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      
    })

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _payrollaccountingService: PayrollAccountingService,
    private _dialogRef: MatDialogRef<PayrollAccountingManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {



  }

 




}




