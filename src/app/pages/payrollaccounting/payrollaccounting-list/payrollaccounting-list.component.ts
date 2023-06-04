import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayrollAccountingService } from 'src/app/services/payrollaccounting.service';
import { ApiResponse } from 'src/app/commons/response.interface';

@Component({
  selector: 'vex-payrollaccounting-list',
  templateUrl: './payrollaccounting-list.component.html',
  styleUrls: ['./payrollaccounting-list.component.scss'],
})
export class PayrollAccountingListComponent implements OnInit {
  form: FormGroup;
  queryMonth: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  queryYear: number[] = Array.from({ length: 9 }, (_, i) => 2015 + i);

  constructor(
    private formBuilder: FormBuilder,
    private payrollAccountingService: PayrollAccountingService
  ) {
    this.form = this.formBuilder.group({
      employeeId: ['', Validators.required],
      queryMonth: ['', Validators.required],
      queryYear: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  // payroll-accounting-list.component.ts
  submitForm(): void {
    if (this.form.valid) {
      const employeeId = this.form.value.employeeId;
      const queryMonth = this.form.value.queryMonth;
      const queryYear = this.form.value.queryYear;

      const payrollAccountingRequest = {
        employeeId: employeeId,
        queryMonth: queryMonth,
        queryYear: queryYear,
      };

      this.payrollAccountingService.PayrollAccountingList(payrollAccountingRequest).subscribe(
        (response: Blob) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

}
