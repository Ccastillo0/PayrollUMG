import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      employeeId: [0, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      baseSalary: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      positionId: ['', [Validators.required]]
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data != null) {
      this.EmployeeById(this.data.data.employeeId)
    }
  }

  EmployeeById(employeeId: number): void {
    this._employeeService.EmployeeById(employeeId).subscribe(
      (resp) => {
        this.form.reset({
          employeeId: resp.employeeId,
          firstName: resp.firstName,
          lastName: resp.lastName,
          dpi: resp.dpi,
          dateOfBirth: resp.dateOfBirth,
          hireDate: resp.hireDate,
          baseSalary: resp.baseSalary,
          departmentId: resp.departmentId,
          positionId: resp.positionId
        })
      }
    )
  }

  EmployeeSave(): void {
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const employeeId = this.form.get('employeeId').value
    console.log(employeeId)

     if (employeeId > 0) {
       this.EmployeeEdit(employeeId)
     } else {
       this.EmployeeRegister()
     }
  }


  EmployeeRegister(): void {
    this._employeeService.EmployeeRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  EmployeeEdit(employeeId: number): void {
    this._employeeService.EmployeeEdit(employeeId, this.form.value).subscribe(resp => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atention', resp.message);
      }
    });
  }

}







