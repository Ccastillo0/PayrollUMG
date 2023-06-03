import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { AlertService } from '@shared/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import * as configs from '../../../../static-data/configs';


@Component({
  selector: 'vex-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  
  icClose = icClose
  configs = configs

  form: FormGroup

  initForm(): void {
      const currentDate = new Date(); // Obtener la fecha actual
      const formattedDate = currentDate.toISOString(); // Formatear la fecha como una cadena ISO
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|\:;"'<>,.?/]).{8,}$/;

      this.form = this._fb.group({
        userId: [0, [Validators.required]],
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
        email: ['', [Validators.required,Validators.email]],
        createdAt: [formattedDate]
      })
    }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data != null) {
      this.UserById(this.data.data.userId)
    }
  }

  UserById(userId: number): void {
    this._userService.UserById(userId).subscribe(
      (resp) => {
        this.form.reset({
          userId: resp.userId,
          username: resp.username,
          password: resp.password,
          email: resp.email
        })
      }
    )
  }

  UserSave(): void {
    if (this.form.invalid) {
      console.log("Invalid")
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const userId = this.form.get('userId').value
    console.log(userId)

    if (userId > 0) {
      this.UserEdit(userId)
    } else {
      this.UserRegister()
    }
  }


  UserRegister(): void {
    this._userService.UserRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Successfull', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atention', resp.message);
      }
    })
  }

  UserEdit(userId: number): void {
    this._userService.UserEdit(userId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)

      } else {
        this._alert.success('Atencion', resp.message);
      }
    })

  }
}
