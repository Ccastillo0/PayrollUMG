import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { DepartmentService } from 'src/app/services/department.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-department-manage',
  templateUrl: './department-manage.component.html',
  styleUrls: ['./department-manage.component.scss']
})
export class DepartmentManageComponent implements OnInit {

  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO

    this.form = this._fb.group({
      departmentId: [0, [Validators.required]],
      departmentName: ['', [Validators.required]],
    })

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<DepartmentManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    if (this.data != null) {
      this.DepartmentById(this.data.data.departmentId)
    }
  }

  DepartmentById(departmentId: number): void {
    this._departmentService.DepartmentById(departmentId).subscribe(
      (resp) => {
        this.form.reset({
          departmentId: resp.departmentId,
          departmentName: resp.departmentName,
        })
      }
    )
  }

  DepartmentSave(): void {
    console.log(this.data)
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const departmentId = this.form.get('departmentId').value
    console.log(departmentId)

    if (departmentId > 0) {
      this.DepartmentEdit(departmentId)
    } else {
      this.DepartmentRegister()
    }
  }


  DepartmentRegister(): void {
    this._departmentService.DepartmentRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  DepartmentEdit(departmentId: number): void {
    this._departmentService.DepartmentEdit(departmentId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)

      } else {
        this._alert.success('Atencion', resp.message);
      }
    })

  }
}
